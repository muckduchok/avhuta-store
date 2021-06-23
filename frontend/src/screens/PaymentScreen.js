import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cart';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = (props) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState('');
  const dispatch = useDispatch();

  if (!shippingAddress.address) {
    props.history.push('/shipping');
  }

  const submitDo = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));
    props.history.push('/placeorder');
  };

  return (
    <div className="container payment">
      <h2>Выбор платежной системы</h2>
      <CheckoutSteps step1 step2 step3 />

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
                onChange={(e) => setPaymentMethod(e.target.value)}
              />

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
                value="LiqPay"
                id="liqpay"
                required
                onChange={(e) => setPaymentMethod(e.target.value)}
              />

              <label className="form-check-label" htmlFor="liqpay">
                LiqPay
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
                onChange={(e) => setPaymentMethod(e.target.value)}
              />

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
