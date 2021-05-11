import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/order.js';
import { isAuth, isAdmin } from '../utils.js';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const orderRouter = express.Router();

orderRouter.get('/', isAuth, isAdmin, expressAsyncHandler (async (req,res) => {
    const orders = await Order.find({}).populate('user', 'name');
    res.send(orders);
}));

orderRouter.get('/my', isAuth, expressAsyncHandler( async (req,res) => {
    const orders = await Order.find({user: req.user._id});
    res.send(orders);
}));

orderRouter.post('/', isAuth, expressAsyncHandler (async (req, res) => {
    if (req.body.orderItems.length === 0) {
        res.status(400).send({message: "Корзина пустая"});
    } else {
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id
        });
        const createdOrder = await order.save();
        res.status(201).send({message: 'Новый заказ создан', order: createdOrder});
    }
}));

orderRouter.get('/:id', isAuth, expressAsyncHandler (async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        res.send(order);
    } else {
        res.status(404).send({message: 'Заказ не найден'});
    }
}));

orderRouter.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: `http://localhost:3000/order/${req.body.url}?success=true`,
        cancel_url: `http://localhost:3000/order/${req.body.url}`,
        line_items: [{
            amount: req.body.amount,
            currency: 'uah',
            name: 'Покупка',
            quantity: 1
        }]
    });
    res.json({
        id: session.id
    });
});


orderRouter.put('/:id/pay', isAuth, expressAsyncHandler( async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        };
        const updatedOrder = await order.save();
        res.send({message: 'Заказ оплачен', order: updatedOrder}); 
    } else {
        res.status(404).send({message: 'Заказ не найден'});
    }
}));

orderRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler( async (req,res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        const deleteOrder = await order.remove();
        res.send({message: 'Заказ удален', order: deleteOrder});
    } else {
        res.status(404).send({message: 'Заказ не найден'});
    }
}));

export default orderRouter;