import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cart';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = (props) => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [paymentMethod, setPaymentMethod] = useState('');
    const dispatch = useDispatch();

    if(!shippingAddress.address) {
        props.history.push('/shipping');
    }

    const submitDo = (e) => {
        e.preventDefault();

        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder');
    }

    return (
        <div className="container">
            <h2>Выбор платежной системы</h2>
            <CheckoutSteps step1 step2 step3/>

        <form className="form" onSubmit={submitDo}>
            <div className="form-check form__item1">
                <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    value="Stripe"
                    id="stripe"
                    required
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}></input>

                <label className="form-check-label" htmlFor="stripe">
                    Stripe
                </label>
            </div>

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