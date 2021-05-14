import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsOrder, payOrder } from '../actions/order';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { loadStripe } from '@stripe/stripe-js';
import { ORDER_PAY_RESET } from '../constants/orderConstans';

const OrderScreen = (props) => {
    const stripePromise = loadStripe('pk_test_51IlGQMB7mrA0X6eKKiyB13CrdCX790ZtmllQwT6p25Mi9Bf8tPBljR2F7jQZPuGp4Jiihiw50OYXt6ksLEe0Hl1C000mMJ3y3E');
    const orderId = props.match.params.id;

    const dispatch = useDispatch();

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error} = orderDetails;

    const orderPay = useSelector((state) => state.orderPay);
    const {
        loading: loadingPay,
        error: errorPay,
        success: successPay} = orderPay;        
    
    const [sdkReady, setSdkReady] = useState(false);
    
    useEffect((paymentResult) => {

        const addStripeScript = () => {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = "https://js.stripe.com/v3/";
            script.async = true;
            script.onLoad = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };

        const query = new URLSearchParams(window.location.search);

        if (query.get("success")) {
            dispatch(payOrder(order, paymentResult));
            dispatch({ type: ORDER_PAY_RESET });
          }
          if (query.get("canceled")) {
            setMessage(<MessageBox variant="danger">Не оплачено</MessageBox> )
          }

        if (!order || successPay || (order && order._id !== orderId)) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch(detailsOrder(orderId));
        } else {
            if (!order.isPaid) {
                if (window.stripe) {
                    addStripeScript();
                } else {
                    setSdkReady(true);
                }
            }
        }

    }, [dispatch, order, orderId, sdkReady, successPay]);
    
    const [message, setMessage] = useState("");

    const handleClick = async () => {
        const stripe = await stripePromise;

        const response = await fetch('/api/orders/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: order.itemsPrice * 100,
                url: orderId
            }),
        });

        const session = await response.json();
        
        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        });

        // Тут может быть ошибка в будущем* (убрать message)
        if (result.error) {
            console.log(message);
          }
    }

    return loading ? (<LoadingBox></LoadingBox>) :
    error ? (<MessageBox variant="danger">{error}</MessageBox>)
    :
    (
        <div className="container">
            <h2>Заказ: {order._id}</h2>
            <div className="row">
                <div className="col">
                    <div className="collection">
                        <p>
                            <strong>Имя:</strong> {order.shippingAddress.fullName} <br />
                            <strong>Город:</strong> {order.shippingAddress.city} <br />
                            <strong>Адресс:</strong> {order.shippingAddress.address}
                        </p>
                    </div>
                    {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
                </div>

                <div className="col">
                    {
                        order.orderItems.map((item) => (
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
                        <span className="total"><strong>Итого: </strong></span>
                        <span className="price">{order.itemsPrice} $</span>

                        {!order.isPaid && (
                                <div>
                                    {!sdkReady ? (
                                        <LoadingBox></LoadingBox>
                                    ) : (
                                        <>
                                        {errorPay && (<MessageBox variant="danger">{error}</MessageBox> )}
                                        {loadingPay && <LoadingBox></LoadingBox>}

                                        <div className="signin__button form__button">
                                            <button
                                                role="link"
                                                className="button-submit payment-button"
                                                type="button"
                                                onClick={handleClick}
                                                >
                                                    Оплатить
                                            </button>
                                        </div>
                                        </>
                                    )}
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderScreen;