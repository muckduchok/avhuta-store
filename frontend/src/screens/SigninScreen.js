import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/user';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const SigninScreen = (props) => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

const userSignin = useSelector((state) => state.userSignin);
const { userInfo, loading, error } = userSignin;

const dispatch = useDispatch();
const submitDo = (e) => {
    e.preventDefault();

    dispatch(signin(email, password));
};

useEffect(() => {
    if (userInfo) {
        props.history.push(redirect);
    }
}, [props.history, redirect, userInfo]);

    return (
        <div className="container-sm">
            <h2 className="title-signin">Вход в кабинет покупателя</h2>

            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}

            <form className="signin" onSubmit={submitDo}>
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

                <div className="signin__button">
                    <label />
                    <button type="submit" className="button-submit">
                        Войти
                    </button>
                        <Link className="button-register" to={`/register?redirect=${redirect}`}>
                            Зарегистрироваться
                        </Link>
                </div>
            </form>
        </div>
    );
};

export default SigninScreen;