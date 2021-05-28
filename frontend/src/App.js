import React, { useEffect, useState } from 'react';
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
import AdminRouter from './components/AdminRouter';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import { listProductsCategory } from './actions/products';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import ShippingInfo from './screens/info/ShippingInfo';
import PayInfo from './screens/info/PayInfo';
import ContactsInfo from './screens/info/ContactsInfo';
import CompanyInfo from './screens/info/CompanyInfo';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const productCategoryList = useSelector((state) => state.categoryList);
  const { loading: loadingCategories, error: errorCategories, categories } = productCategoryList;
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutDo = () => {
    dispatch(signout());
  };
  useEffect(() => {
    dispatch(listProductsCategory());
  }, [dispatch]);
  const [search, setSearch] = useState(false);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  return (
    <BrowserRouter>
    <div className="main">
    <header className="header container">
      <div className="header__content">

        <div className="header__area-burger">
          <button onClick={() => setSidebarIsOpen(true)} type="button" className="button-burger open-sidebar">
            <span className="icon-burger"><i className="bi bi-list-nested"></i></span>
            <span className="icon-text">Меню</span>
          </button>
        </div>
        {!search ? (<Link to="/"className="header__area-logo">
          <span className="header__logo">
              <img src="https://static-sl.insales.ru/files/1/2933/14871413/original/Group_8.svg" alt="logo"></img>
          </span>
        </Link>) : ('')}
        
        {search ? (<Route render={({history}) =>
            <SearchBox history={history}></SearchBox>}>
          </Route>) : ('')}

        <div className="header__area-controls">
    
          <div className="control-search">
          
            <button type="button" className="search-btn">
              {!search ? (<span onClick={() => setSearch(true)} className="icon-search _show"><i className="bi bi-search"></i></span>) : (
                  <span onClick={() => setSearch(false)} className="icon-close _hide"><i className="bi bi-x-circle"></i></span>
              
              )}
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
                  <div>
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
                  </div>
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

    <aside className={sidebarIsOpen ? 'open' : ''}>
      <ul className="categories">
        <li>
          <strong>Каталог</strong>
          
          <button className="close-sidebar" type="button" onClick={() => setSidebarIsOpen(false)}><i className="bi bi-x-circle-fill"></i></button>
        </li>
        <hr/>
        {loadingCategories ? (
          <LoadingBox></LoadingBox>
          ) : errorCategories ? (
          <MessageBox variant="danger">{errorCategories}
          </MessageBox>
          ) : (
            categories.map((c) => (
              <li className="categories-li" key={c}>
                <Link to={`/search/category/${c}`} onClick={() => setSidebarIsOpen(false)}>{c}</Link>
              </li>
            ))
        )}
      </ul>
      <hr/>
      <ul>
        <li>
          <strong className="popravka">Навигация</strong>
        </li>
        <li>
        <Link to="/search/name" onClick={() => setSidebarIsOpen(false)}>Все категории</Link>
        </li>
        <li>
        <Link to="/company-info" onClick={() => setSidebarIsOpen(false)}>О компании</Link>
        </li>
        <li>
        <Link to="/contacts-info" onClick={() => setSidebarIsOpen(false)}>Контакты</Link>
        </li>
        <li>
          <Link to="/shipping-info" onClick={() => setSidebarIsOpen(false)}>Доставка</Link>
        </li>
        <li>
        <Link to="/pay-info" onClick={() => setSidebarIsOpen(false)}>Оплата</Link>
        </li>
      </ul>
      <hr/>
      <div className="contacts">
        <h5>Контакты</h5>
        <a className="phone" href="tel:+380668173846">+380 66 817 3846</a>
        <span>Украина, г.Сумы</span>
      </div>
    </aside>
    
    <AdminRouter path="/products" component={ProductListScreen} exact></AdminRouter>
    <AdminRouter path="/products/pageNumber/:pageNumber" component={ProductListScreen} exact></AdminRouter>

    <Route path="/shipping-info" component={ShippingInfo}></Route>
    <Route path="/pay-info" component={PayInfo}></Route>
    <Route path="/contacts-info" component={ContactsInfo}></Route>
    <Route path="/company-info" component={CompanyInfo}></Route>

    <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
    <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
    <Route path="/order/:id" component={OrderScreen}></Route>
    <Route path="/placeorder" component={PlaceOrderScreen}></Route>
    <Route path="/payment" component={PaymentScreen}></Route>
    <Route path="/shipping" component={ShippingScreen}></Route>
    <Route path="/register" component={RegisterScreen}></Route>
    <Route path="/signin" component={SigninScreen}></Route>
    <Route path="/cart/:id?" component={CartScreen}></Route>
    <Route path="/product/:id" component={ProductScreen} exact></Route>
    <Route
            path="/search/name/:name?"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/raiting/:raiting/order/:order/pageNumber/:pageNumber"
            component={SearchScreen}
            exact
          ></Route>

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
