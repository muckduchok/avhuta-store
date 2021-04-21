import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import data from './data';

import './app.sass';

function App() {

  return (
    <div className="main">

    <header className="header container">
      <div className="header__content">

        <div className="header__area-burger">
          <button type="button" className="button-burger">
            <span className="icon-burger"><i className="bi bi-list-nested"></i></span>
            <span className="icon-text">Меню</span>
          </button>
        </div>

        <a href="/"className="header__area-logo">
          <span className="header__logo">
              <img src="https://static-sl.insales.ru/files/1/2933/14871413/original/Group_8.svg" alt="logo"></img>
          </span>
        </a>

        <div className="header__area-controls">

          <div className="control-search">
            <form action="/search" method="get" className="header__search-form">
              <input type="text" autoComplete="off" className="form-control" placeholder="Поиск"></input>
            </form>
            <button type="button" className="search-btn">
              <span className="icon-search _show"><i className="bi bi-search"></i></span>
              <span className="icon-close _hide"><i className="bi bi-x-circle(hide)"></i></span>
            </button>

            <a href="/profile" className="control-profile">
              <span className="icon-user"><i className="bi bi-person"></i></span>
            </a>

            <a href="/cart" className="control-cart">
              <span className="icon-cart"><i className="bi bi-cart3"></i></span>
            </a>
          </div>
        </div>
      </div>
    </header>
    
    <div className="carousel container">
      <Carousel showThumbs={false} showStatus={false} centerMode={true} >
        <div>
          <img src="https://st.depositphotos.com/1288156/4466/i/600/depositphotos_44660695-stock-photo-himalaya-mountains-black-and-white.jpg" alt="title"></img>
        </div>
        <div>
          <img src="https://vesti.ua/wp-content/uploads/2020/06/samye-vysokie-gory.jpg" alt="title"></img>
        </div>
        <div>
          <img src="https://content.skyscnr.com/m/11196ac8d07cb65e/original/eyeem_99478250-jpg.jpg" alt="titl"></img>
        </div>
      </Carousel>
    </div>

    <div className="title">
      <h2>Все товары</h2>
    </div>
    
    <div className="product__content container-sm">
      <div className="row">
        {
          data.products.map(product => (
            <div key={product.id} className="col-sm-3">
            <div className="card">
              <div className="card__img">
                <a className="card__img-image" href="/">
                  <img className="card-img-top" src={product.image} alt="hello"></img>
                </a>
              </div>
    
              <div className="card__title">
                <span className="card__title-text">{product.name}</span>
              </div>

              <div className="card__raiting">
                <span><i className="bi bi-star"></i></span>
                <span><i className="bi bi-star"></i></span>
                <span><i className="bi bi-star"></i></span>
                <span><i className="bi bi-star"></i></span>
                <span><i className="bi bi-star"></i></span>
              </div>
    
              <div className="card__collection">
                <div className="card__collection-price">
                  <span className="card__collection-price-text">{product.price} $</span>
                </div>
                <div className="card__collection-cart">
                  <button className="button-cart">
                    <i className="bi bi-cart-plus" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          ))
        }
      </div>
    </div>

<div className="descr">
  <div className="descr__i">
    <i className="bi bi-shop"></i>
  </div>
  <div className="descr__title">
    <h6>О магазине Mono</h6>
  </div>
  <div className="descr__text">
  Тут вы можете добавить небольшое описание о вашем интернет-магазине. Какие у вас есть плюсы и можете добавить интересные факты о магазине
  </div>
  <div className="descr__dop">
    <a href="/">Подробнее</a>
  </div>
</div>

</div>

  );
}

export default App;
