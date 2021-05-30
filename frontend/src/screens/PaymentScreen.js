import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cart';
import { createOrder } from '../actions/order';
import CheckoutSteps from '../components/CheckoutSteps';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_CREATE_RESET } from '../constants/orderConstans';

const PaymentScreen = (props) => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [paymentMethod, setPaymentMethod] = useState('');

    const orderCreate = useSelector((state) => state.orderCreate);
    const { loading, success, error, order} = orderCreate;

    const dispatch = useDispatch();

    if(!shippingAddress.address) {
        props.history.push('/shipping');
    }
    if (!cart.paymentMethod) {
        props.history.push('/payment');
    }

    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0));
    cart.totalPrice = cart.itemsPrice + cart.shippingAddress + cart.taxPrice;

    const submitDo = (e) => {
        e.preventDefault();

        dispatch(savePaymentMethod(paymentMethod));
        dispatch(createOrder({...cart, orderItems: cart.cartItems}));
    }

    useEffect(() => {
        if (success && cart.paymentMethod) {
            props.history.push(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [dispatch, order, props.history, success, cart.paymentMethod]);

    return (
        <div className="container payment">
            <h2>Выбор платежной системы</h2>
            <CheckoutSteps step1 step2 step3/>

            { loading && <LoadingBox></LoadingBox> }
            { error &&  <MessageBox variant="danger">{error}</MessageBox>}

        <form className="form" onSubmit={submitDo}>
            <ul>
                <li>
                    <div className="form-check form__item1">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="paymentMethod"
                            value="Stripe"
                            id="stripe"
                            required
                            onChange={(e) => setPaymentMethod(e.target.value)}></input>

                        <label className="form-check-label" htmlFor="stripe">
                            Stripe
                        </label>
                    </div>
                </li>
            
                <li>
                    <div className="form-check form__item2">
                        <input 
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        value="PayPal"
                        id="paypal"
                        required
                        onChange={(e) => setPaymentMethod(e.target.value)}></input>

                        <label className="form-check-label" htmlFor="paypal">
                            Paypal
                        </label>
                    </div>
                </li>
            
                <li>
                    <div className="form-check form__item3">
                        <input 
                            className="form-check-input"
                            type="radio"
                            name="paymentMethod"
                            value="Наличными"
                            id="onclick"
                            required
                            onChange={(e) => setPaymentMethod(e.target.value)}></input>

                        <label className="form-check-label" htmlFor="onclick">
                            Наличными
                        </label>
                    </div>
                </li>
            </ul>
            
            <div className="signin__button form__button">
                <label />
                <button type="submit" className="button-submit payment-button">
                    Продолжить
                </button>
            </div>
        </form>
            
        </div>
    );
};

export default PaymentScreen;