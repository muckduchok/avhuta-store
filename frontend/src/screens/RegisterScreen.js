import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/user';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const RegisterScreen = (props) => {

const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');

const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

const userRegister = useSelector((state) => state.userRegister);
const { userInfo, loading, error } = userRegister;

const dispatch = useDispatch();
const submitDo = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        alert('Пароли не совпадают')
    } else {
        dispatch(register(name, email, phone, password));
    }
};
useEffect(() => {
    if (userInfo) {
        props.history.push(redirect);
    }
}, [props.history, redirect, userInfo]);

    return (
        <div className="container-sm">
            <h2 className="title-signin">Регистрация</h2>

            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}

            <form className="signin" onSubmit={submitDo}>
                <div className="signin__name">
                        <label className="signin__name-label" htmlFor="name">Имя</label>
                        <input
                        className="signin__name-input"
                        id="name"
                        type="name"
                        required
                        onChange={(e) => setName(e.target.value)} >
                        </input>
                    </div>

                <div className="signin__login">
                    <label className="signin__login-label" htmlFor="email">Email</label>
                    <input
                     className="signin__login-input"
                     id="email"
                     type="email"
                     required
                     onChange={(e) => setEmail(e.target.value)} >
                    </input>
                </div>

                <div className="signin__login">
                    <label className="signin__login-label" htmlFor="phone">Номер телефона</label>
                    <input
                     className="signin__login-input"
                     id="phone"
                     type="phone"
                     required
                     onChange={(e) => setPhone(e.target.value)} >
                    </input>
                </div>

                <div className="signin__pass">
                    <label className="signin__pass-label" htmlFor="password">Пароль</label>
                    <input 
                     className="signin__pass-input"
                     id="password"
                     type="password"
                     required
                     onChange={(e) => setPassword(e.target.value)} >
                    </input>
                </div>

                <div className="signin__repass">
                    <label className="signin__repass-label" htmlFor="password">Подтвердите пароль</label>
                    <input 
                     className="signin__repass-input"
                     id="confirmPassword"
                     type="password"
                     required
                     onChange={(e) => setConfirmPassword(e.target.value)} >
                    </input>
                </div>

                <div className="signin__button">
                    <label />
                    <button type="submit" className="button-submit">
                        Зарегистрироваться
                    </button>
                    <Link className="button-register" to={`/signin?redirect=${redirect}`}>
                        Уже есть аккаунт
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default RegisterScreen;