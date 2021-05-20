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
    const { loading, success, error, order} = orderCreate;

    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0));
    cart.totalPrice = cart.itemsPrice + cart.shippingAddress + cart.taxPrice;

    const dispatch = useDispatch();

    const placeOrderDo = () => {
        dispatch(createOrder({...cart, orderItems: cart.cartItems}));
    };

    useEffect(() => {
        if (success && cart.paymentMethod) {
            props.history.push(`/order/${order._id}/${cart.paymentMethod}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [dispatch, order, props.history, success, cart.paymentMethod]);

    return (
        <div className="container">
            <h2>Подтверждение заказа</h2>

            <CheckoutSteps step1 step2 step3 step4/>
            <div className="row">
                <div className="col-md-6">
                    <div className="collection">
                        <p className="collection-p">
                            <strong className="collection-strong">Имя:</strong><span> {cart.shippingAddress.fullName}</span> <br />
                            <strong className="collection-strong">Город:</strong> <span> {cart.shippingAddress.city}</span> <br />
                            <strong className="collection-strong">Адресс:</strong> <span> {cart.shippingAddress.address}</span> <br/>
                            <strong className="collection-strong">Номер:</strong> <span> {cart.shippingAddress.country}</span> <br/>
                            <strong className="collection-strong">Оплата:</strong> <span> {cart.paymentMethod}</span>
                        </p>
                    </div>
                </div>
                <div className="col-md-6">
                    {
                        cart.cartItems.map((item) => (
                            <div key={item.product} className="cart__items">
                                <div className="cart__items-img">
                                    <img src={item.image} alt={item.name}></img>
                                </div>
                            <div className="cart__items-name">
                                <span>{item.name}</span>
                            </div>
                            <div className="cart__items-price">
                            <span>{item.qty}x <strong>{item.qty * item.price} грн</strong></span>
                            </div>
                        </div>
                        ))
                    }
                    <hr />
                    <div className="cart__items-itogo">
                        <span className="total">Итого: </span>
                        <span className="price">{cart.itemsPrice} грн</span>  
                    </div>
                    <div className="signin__button">
                            <label />
                            <button type="button" onClick={placeOrderDo} disabled={cart.cartItems.length === 0} className="button-submit">
                                Продолжить
                            </button>
                        </div>

                        { loading && <LoadingBox></LoadingBox> }
                        { error && <MessageBox variant="danger">{error}</MessageBox>}
                </div>
            </div>
        </div>
    );
};

export default PlaceOrderScreen;