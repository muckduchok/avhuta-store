import express from 'express';
import data from '../data.js';
import User from '../models/user.js';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { generateToken, isAdmin, isAuth } from '../utils.js';

const userRouter = express.Router();

userRouter.get(
    '/seed',
    expressAsyncHandler( async (req, res) => {
    // await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({createdUsers});
}));

userRouter.post('/signin', expressAsyncHandler (async(req, res) => {
    const user = await User.findOne({email: req.body.email});

    if(user) {
        if(bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user)
            });
            return;
        }
    }
    res.status(401).send({message: 'Неправильный Email или пароль'});
}));

userRouter.post('/register', expressAsyncHandler(async(req, res) => {
    const user = await User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: bcrypt.hashSync(req.body.password, 8)});

    const createdUser = await user.save();
    res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        phone: createdUser.phone,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser)
    });
}));

userRouter.get('/:id', expressAsyncHandler( async (req,res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        res.send(user);
    } else {
        res.status(404).send({message: 'Пользователь не найден'})
    }
}));

userRouter.put('/profile', isAuth, expressAsyncHandler (async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8);
        }
    const updatedUser = await user.save();
    res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
    });
    }
}));

userRouter.get('/', isAuth, isAdmin, expressAsyncHandler (async (req,res) => {
    const users = await User.find({});
    res.send(users);
}));

userRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler (async (req,res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        if (user === 'admin@gmail.com') {
            res.status(400).send({message: 'Нельзя удалить админа'});
            return;
        }
        const deleteUser = await user.remove();
        res.send({message: 'Пользователь удален', user: deleteUser});
    } else {
        send.status(404).send({message: 'Пользователь не найден'});
    }
}));

userRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler (async (req,res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        user.isAdmin = req.body.isAdmin || user.isAdmin;

        const updatedUser = await user.save();
        res.send({message: 'Пользователь обновлен', user: updatedUser});
    } else {
        res.status(404).send({message: 'Пользователь не найден'});
    }
}));

export default userRouter;