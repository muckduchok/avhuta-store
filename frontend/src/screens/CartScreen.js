import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cart';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';

const CartScreen = (props) => {
    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const dispatch = useDispatch();
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartAction = (id) => {
        dispatch(removeFromCart(id));
    }

    const checkout = () => {
        props.history.push('/signin?redirect=shipping');
    }

    return (
        <div className="container">
            <div className="cart-title">
            <h2>Корзина</h2>
            {
                cartItems.length === 0 ? <MessageBox>
                    Корзина пустая. <Link to="/">На главную</Link>
                    </MessageBox>
                :
                (
                    <div className="cart row top">
                    <div className="col-8">
                        {
                            cartItems.map((item) => (
                                <div key={item.product} className="cart__items">
                                <div className="cart__items-img">
                                    <img src={item.image} alt={item.name}></img>
                                </div>
                                <div className="cart__items-name">
                                    <span>{item.name}</span>
                                </div>
                                <div className="cart__items-counter">
                                    <select value={item.qty}
                                            onChange={(e) =>
                                                dispatch(
                                                    addToCart(item.product,
                                                    Number(e.target.value))
                                                )}>
                            {
                                [...Array(item.countInStock).keys()].map((x) => (
                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                ))
                            }
                                    </select>
                                </div>
                                <div className="cart__items-price">
                                    <span>{item.price} грн</span>
                                </div>
                                <div className="cart__items-delete">
                                    <span type="button" onClick={() => removeFromCartAction(item.product)}><i className="bi bi-trash"></i></span>
                                </div>
                    </div>
                            ))
                        }

            </div>

            <div className="col">
                <div className="cart__final">
                    <div className="cart__final-products">
                        <span className="cart__final-products-title">
                            Товары ({cartItems.reduce((a, c) => a + c.qty, 0)})
                        </span>
                        <span className="cart__final-products-price">
                        {cartItems.reduce((a, c) => a + c.price * c.qty, 0)} грн
                        </span>
                    </div>
                    <div className="cart__final-total">
                        <span className="cart__final-total-title">
                        Итого к оплате:
                            {
                                
                            }
                        </span>
                        <span className="cart__final-total-price">
                        {cartItems.reduce((a, c) => a + c.price * c.qty, 0)} грн
                        </span>
                    </div>

                    <div className="cart__final-button">
                        <button onClick={checkout} disabled={cartItems.length === 0} ><strong>Купить</strong></button>
                    </div>
                </div>
            </div>
        </div>
                )
            }
        </div>
        </div>
        
    );
};

export default CartScreen;