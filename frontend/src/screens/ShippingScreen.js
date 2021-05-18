import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cart';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = (props) => {
    const userSignin = useSelector(state => state.userSignin);
    const cart = useSelector(state => state.cart);
    const {userInfo} = userSignin;
    const {shippingAddress} = cart;

    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [country, setCountry] = useState(shippingAddress.country);
    const [city, setCity] = useState(shippingAddress.city);
    const [address, setAddress] = useState(shippingAddress.address);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const dispatch = useDispatch();

    if(!userInfo) {
        props.history.push('/signin');
    }

    const submitDo = (e) => {
        e.preventDefault();

        dispatch(saveShippingAddress({fullName, address, postalCode, country, city}));

        props.history.push('/payment');
    }

    return (
        <div className="container">
            <h2>Оформление заказа</h2>

            <CheckoutSteps step1 step2></CheckoutSteps>

            <form className="signin" onSubmit={submitDo}>
                <div className="signin__name">
                        <label className="signin__name-label" htmlFor="fullName">Полное имя</label>
                        <input
                        className="signin__name-input"
                        id="name"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)} >
                        </input>
                    </div>

                <div className="signin__name">
                    <label className="signin__name-label" htmlFor="phone">Номер телефона</label>
                    <input
                    className="signin__name-input"
                    id="phone"
                    type="phone"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)} >
                    </input>
                </div>

                <div className="signin__login">
                    <label className="signin__login-label" htmlFor="city">Город</label>
                    <input
                     className="signin__login-input"
                     id="city"
                     type="text"
                     required
                     value={city}
                     onChange={(e) => setCity(e.target.value)} >
                    </input>
                </div>

                <div className="signin__pass">
                    <label className="signin__pass-label" htmlFor="text">Адресс новой почты</label>
                    <input 
                     className="signin__pass-input"
                     id="text"
                     type="text"
                     required
                     value={address}
                     onChange={(e) => setAddress(e.target.value)} >
                    </input>
                </div>

                <div className="signin__repass">
                    <label className="signin__repass-label" htmlFor="postalCode">Почтовый индекс</label>
                    <input 
                     className="signin__repass-input"
                     id="postalCode"
                     type="text"
                     required
                     value={postalCode}
                     onChange={(e) => setPostalCode(e.target.value)} >
                    </input>
                </div>

                <div className="signin__button">
                    <label />
                    <button type="submit" className="button-submit">
                        Продолжить
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ShippingScreen;