import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsOrder, payOrder } from '../actions/order';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { loadStripe } from '@stripe/stripe-js';
import { ORDER_PAY_RESET } from '../constants/orderConstans';
import emailjs from 'emailjs-com';

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
    const [onClicker, setOnClick] = useState(false);
    
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

    const handleClickStripe = async () => {
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
    const handleClickPaypal = () => {
        console.log('Здесь будет оплата с помощью LiqPay');
    }

    const handleOnClick = (e) => {
        e.preventDefault();
        const templateParams = {
            id: order._id,
            name: order.shippingAddress.fullName,
            phone: order.shippingAddress.country,
            email: order.shippingAddress.email,
            pochta: order.shippingAddress.address,
            products: order.orderItems.map((i) => (
                i.name
            ))
        };

        emailjs.send('service_hmb19zn', 'template_l3iin8p', templateParams, 'user_QD21e8rLtXmyY2jao1qrH')
            .then(function(response) {
                console.log('Отправлено', response.status, response.text, setOnClick(true));
            }, function(error) {
                console.log('Ошибка', error, setOnClick(false));
            });
    }

    return loading ? (<LoadingBox></LoadingBox>) :
    error ? (<MessageBox variant="danger">{error}</MessageBox>)
    :
    (
        <div className="container orders">
            <h3>Заказ № {order._id}</h3>
            <br/>
            <span className="title">Информация о заказе</span>
            <hr/>
            <div className="orders__items">
                <div className="orders__items-item">
                    <span>Дата оформления: </span>
                    <p>{order.createdAt}</p>
                </div>
                <div className="orders__items-item">
                    <span>Сумма и статус: </span>
                    <p>{order.itemsPrice} грн </p>
                    <div className="strongs">
                    </div>
                    {order.isPaid ? (
                   <MessageBox className="messagebox" variant="success">
                     <strong>Оплачено</strong>
                   </MessageBox>
                 ) : (
                   <MessageBox className="messagebox" variant="danger"><strong>Не оплачено</strong></MessageBox>
                 )}
                    
                    
                </div>
                <div className="orders__items-item">
                    <span>Способ оплаты: </span>
                    <p>{order.paymentMethod}</p>
                </div>
                <div className="orders__items-item">
                    <span>Город доставки: </span>
                    <p>{order.shippingAddress.city}</p>
                </div>
                <div className="orders__items-item">
                    <span>Адресс доставки: </span>
                    <p>{order.shippingAddress.address}</p>
                </div>
                <div className="orders__items-item">
                    <span>Получатель: </span>
                    <p>{order.shippingAddress.fullName}</p>
                </div>
                <div className="orders__items-item">
                    <span>Номер телефона: </span>
                    <p>{order.shippingAddress.country}</p>
                </div>
                <div className="orders__items-item">
                    <span>Email: </span>
                    <p>{order.shippingAddress.email}</p>
                </div>
            </div>
            <hr/>
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
                        {order.orderItems.map((item) => (
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.qty}</td>
                            <td>{item.price} <strong>грн</strong></td>
                        </tr>
                        ))}
                        <tr>
                            <td>Итого: <strong>{order.itemsPrice} грн</strong></td>
                        </tr>
                    </tbody>
                </table>
                </div>
                {!order.isPaid && (
                    <div>
                        {!sdkReady ? (
                            <LoadingBox></LoadingBox>
                        ) : (
                            <>
                            {errorPay && (<MessageBox variant="danger">{errorPay}</MessageBox> )}
                            {loadingPay && <LoadingBox></LoadingBox>}
                                
                            {order.paymentMethod === 'Stripe' ? (
                                <div className="signin__button form__button">
                                <button
                                    role="link"
                                    className="button-submit payment-button"
                                    type="button"
                                    onClick={handleClickStripe} >
                                        Оплатить с помощью Stripe
                                </button>
                            </div>
                            ) : order.paymentMethod === 'PayPal' ? (
                                <div className="signin__button form__button">
                                <button
                                    role="link"
                                    className="button-submit payment-button"
                                    type="button"
                                    onClick={handleClickPaypal} >
                                        Оплатить с помощью Paypal
                                </button>
                            </div>
                            ) : order.paymentMethod === 'Наличными' ? (
                                <div className="signin__button form__button">
                                    {onClicker === false && order.paymentMethod === 'Наличными' ? (
                                        <button
                                    role="link"
                                    className="button-submit payment-button"
                                    type="button"
                                    onClick={handleOnClick} >
                                        Купить
                                </button>
                                    ) : (<MessageBox>С коро с вами свяжутся</MessageBox>)}
                                </div>
                            ) : null
                        }
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>

        // <div className="container">
        //     <h2>Заказ: {order._id}</h2>
        //     <div className="row">
        //         <div className="col">
        //             <div className="collection">
        //                 <p className="collection-p">
        //                     <strong className="collection-strong">Имя:</strong><span> {order.shippingAddress.fullName}</span> <br />
        //                     <strong className="collection-strong">Город:</strong> <span> {order.shippingAddress.city}</span> <br />
        //                     <strong className="collection-strong">Адресс:</strong> <span> {order.shippingAddress.address}</span> <br/>
        //                     <strong className="collection-strong">Номер:</strong> <span> {order.shippingAddress.country}</span> <br/>
        //                     <strong className="collection-strong">Оплата:</strong> <span> {order.paymentMethod}</span>
        //                 </p>
        //             </div>
        //             {order.isPaid ? (
        //           <MessageBox variant="success">
        //             Paid at {order.paidAt}
        //           </MessageBox>
        //         ) : (
        //           <MessageBox variant="danger">Не оплачено</MessageBox>
        //         )}
        //         </div>

        //         <div className="col">
        //             {
        //                 order.orderItems.map((item) => (
        //                     <div key={item.product} className="cart__items">
        //                         <div className="cart__items-img">
        //                             <img src={item.image} alt={item.name}></img>
        //                         </div>
        //                     <div className="cart__items-name">
        //                         <span>{item.name}</span>
        //                     </div>
        //                     <div className="cart__items-price">
        //                         <span>{item.qty}x <strong>{item.qty * item.price} грн</strong></span>
        //                     </div>
        //                 </div>
        //                 ))
        //             }
        //             <hr />
        //             <div className="cart__items-itogo">
        //                 <span className="total">Итого: </span>
        //                 <span className="price">{order.itemsPrice} грн</span> 
        //             </div>
                        
        //             </div>
        //     </div>
        // </div>
    );
};

export default OrderScreen;