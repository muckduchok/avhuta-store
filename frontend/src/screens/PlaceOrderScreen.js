import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../actions/order';
import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstans';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const PlaceOrderScreen = (props) => {
  const cart = useSelector((state) => state.cart);

  if (!cart.paymentMethod) {
    props.history.push('/payment');
  }

  const orderCreate = useSelector((state) => state.orderCreate);
  const {
    loading, success, error, order,
  } = orderCreate;

  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0));
  cart.totalPrice = cart.itemsPrice + cart.shippingAddress + cart.taxPrice;

  const dispatch = useDispatch();

  const placeOrderDo = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  useEffect(() => {
    if (success && cart.paymentMethod) {
      props.history.push(`/order/${order._id}/${cart.paymentMethod}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success, cart.paymentMethod]);

  return (
    <div className="container orders">
      <CheckoutSteps step1 step2 step3 step4 />
      <h3>Подверждение заказа</h3>
      <br />
      <hr />
      <div className="orders__items">
        <div className="orders__items-item">
          <span>Способ оплаты: </span>
          <p>{cart.paymentMethod}</p>
        </div>
        <div className="orders__items-item">
          <span>Город доставки: </span>
          <p>{cart.shippingAddress.city}</p>
        </div>
        <div className="orders__items-item">
          <span>Адресс доставки: </span>
          <p>{cart.shippingAddress.address}</p>
        </div>
        <div className="orders__items-item">
          <span>Получатель: </span>
          <p>{cart.shippingAddress.fullName}</p>
        </div>
        <div className="orders__items-item">
          <span>Номер телефона: </span>
          <p>{cart.shippingAddress.country}</p>
        </div>
        <div className="orders__items-item">
          <span>Email: </span>
          <p>{cart.shippingAddress.email}</p>
        </div>
      </div>
      <hr />
      <div className="orders__items">
        <span className="orders__items-title">Состав заказа</span>
        <div className="orders__items-table">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Наименование</th>
                <th scope="col">Кол-во</th>
                <th scope="col">Стоимость</th>
              </tr>
            </thead>
            <tbody>
              {cart.cartItems.map((item) => (
                <tr key={item.product}>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>
                    {item.price}
                    {' '}
                    <strong>грн</strong>
                  </td>
                </tr>
              ))}
              <tr>
                <td>
                  Итого:
                  <strong>
                    {cart.itemsPrice}
                    {' '}
                    грн
                  </strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="signin__button form__button">
          <button
            disabled={cart.cartItems.length === 0}
            role="link"
            className="button-submit payment-button"
            type="button"
            onClick={placeOrderDo}
          >
            Продолжить
          </button>
        </div>
        { loading && <LoadingBox /> }
        { error && <MessageBox variant="danger">{error}</MessageBox>}
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
