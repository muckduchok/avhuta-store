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
        if (success) {
            props.history.push(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [dispatch, order, props.history, success]);

    return (
        <div className="container">
            <h2>Подтверждение заказа</h2>

            <CheckoutSteps step1 step2 step3 step4/>
            <div className="row">
                <div className="col">
                    <div className="collection">
                        <p>
                            <strong>Имя:</strong> {cart.shippingAddress.fullName} <br />
                            <strong>Город:</strong> {cart.shippingAddress.city} <br />
                            <strong>Адресс:</strong> {cart.shippingAddress.address}
                        </p>
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
                <div className="col">
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
                                <span>{item.qty} x ${item.price} = ${item.qty * item.price}</span>
                            </div>
                        </div>
                        ))
                    }
                    <hr />
                    <div>
                        <span className="total">Итого: </span>
                        <span className="price">{cart.itemsPrice}$</span>  
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrderScreen;