import React, { useEffect } from 'react';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/products';
import CarouselBox from '../components/Carousel';
import { Link } from 'react-router-dom';

function HomeScreen(props) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);

    return (
      <>
          <CarouselBox></CarouselBox>
        <div className="product__content container-sm">
          <div className="title">
            <h2>Популярное</h2>
          </div>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox>{error}</MessageBox>
          ) : (
            <div className="row">
          {
            products.map(product => (
              <Product {...props} key={product._id} product={product} />
            ))}
        </div>
          )}
              <Link className="all-products" to="/search/name">Все товары</Link>
            <div className="descr container-sm">
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
      </>
    );
}

export default HomeScreen;