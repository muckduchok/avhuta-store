import React from 'react';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import { signout } from './actions/user.js';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import './app.sass';
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRouter from './components/AdminRouter';
import AdminRouter from './components/AdminRouter';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';

function App() {

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutDo = () => {
    dispatch(signout());
  }

  return (
    <BrowserRouter>
    <div className="main">
    <header className="header container">
      <div className="header__content">

        <div className="header__area-burger">
          <button type="button" className="button-burger">
            <span className="icon-burger"><i className="bi bi-list-nested"></i></span>
            <span className="icon-text">Меню</span>
          </button>
        </div>

        <Link to="/"className="header__area-logo">
          <span className="header__logo">
              <img src="https://static-sl.insales.ru/files/1/2933/14871413/original/Group_8.svg" alt="logo"></img>
          </span>
        </Link>

        <div className="header__area-controls">

          <div className="control-search">
            <form action="/search" method="get" className="header__search-form">
              <input type="text" autoComplete="off" className="form-control" placeholder="Поиск"></input>
            </form>
            <button type="button" className="search-btn">
              <span className="icon-search _show"><i className="bi bi-search"></i></span>
              <span className="icon-close _hide"><i className="bi bi-x-circle(hide)"></i></span>
            </button>

            {
              userInfo ? (
                <div className="dropdown">
                  <Link to="/#" className="control-profile">
                  <span type="button" className="icon-user" >
                    <i className="bi bi-person-fill"></i>
                    <i className="bi bi-caret-down"></i>
                    </span>
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                    <Link to="/profile">Профиль</Link>
                    </li>
                    <li>
                    <Link to="/orderhistory">История</Link>
                    </li>
                    <li>
                    <Link to="#signout" onClick={signoutDo}>Выйти</Link>
                    </li>
                  </ul>
                  
                </div>
                
              ) :
              (
                <Link to="/signin" className="control-profile">
                <span className="icon-user"><i className="bi bi-person"></i></span>
                </Link>                
              )}

              {userInfo && userInfo.isAdmin && (
                <div className="dropdown">
                  <Link to="#admin">
                    <span className="icon-admin">
                    <i className="bi bi-person-circle"></i> {' '}
                    <i className="bi bi-caret-down caret-admin"></i>
                    </span>
                    <ul className="dropdown-content">
                      <li>
                        <Link to="/users">Пользователи</Link>
                      </li>
                      <li>
                        <Link to="/products">Продукты</Link>
                      </li>
                      <li>
                        <Link to="/table">Таблица</Link>
                      </li>
                      <li>
                        <Link to="/orderlist">Заказы</Link>
                      </li>
                    </ul>
                  </Link>
                </div>
              )}

            <Link to="/cart" className="control-cart">
              <span className="icon-cart">
                <i className="bi bi-cart3"></i>
                {cartItems.length > 0 && (
                  <span className="control-bage">{cartItems.length}</span>
                )}
                </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
    
    <PrivateRouter path="/products" component={ProductListScreen}></PrivateRouter>
    <PrivateRouter path="/profile" component={ProfileScreen}></PrivateRouter>
    <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
    <Route path="/order/:id" component={OrderScreen}></Route>
    <Route path="/placeorder" component={PlaceOrderScreen}></Route>
    <Route path="/payment" component={PaymentScreen}></Route>
    <Route path="/shipping" component={ShippingScreen}></Route>
    <Route path="/register" component={RegisterScreen}></Route>
    <Route path="/signin" component={SigninScreen}></Route>
    <Route path="/cart/:id?" component={CartScreen}></Route>
    <Route path="/product/:id" component={ProductScreen} exact></Route>
    <AdminRouter path="/product/:id/edit" component={ProductEditScreen} exact></AdminRouter>
    <AdminRouter path="/orderlist" component={OrderListScreen}></AdminRouter>
    <AdminRouter path="/users" component={UserListScreen}></AdminRouter>
    <AdminRouter path="/user/:id/edit" component={UserEditScreen}></AdminRouter>
    <Route path="/" component={HomeScreen} exact ></Route>

    <footer className="footer container">
      <div className="footer__spans">
        <span className="footer__spans-phone">+380 66 817 3846</span>
        <span className="footer__spans-city">г. Сумы</span>
      </div>
      <div className="footer__logo">
        <img className="footer__logo-img" src="https://static-sl.insales.ru/files/1/2933/14871413/original/Group_8.svg" alt="logo"></img>
      </div>
      <div className="footer__cards">
        <img className="footer__cards-img1" src="https://static-sl.insales.ru/files/1/1305/14550297/original/Visa.svg" alt="logo"></img>
        <img className="footer__cards-img2" src="https://static-sl.insales.ru/files/1/1311/14550303/original/Group.svg" alt="logo"></img>
      </div>
  </footer>

</div>

</BrowserRouter>
  );
}

export default App;
