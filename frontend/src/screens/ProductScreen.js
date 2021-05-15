import React, { useEffect, useState } from 'react';
import Raiting from '../components/Raiting';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/products';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Tabs from '../components/Tabs';

function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector((state) => state.productDetails);
    const {loading, error, product} = productDetails;

    useEffect(() => {
        dispatch(detailsProduct(productId));
    }, [dispatch, productId]);

    const addToCart = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`)
    }
    return (

        <div className="product__content container-sm">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox>{error}</MessageBox>
          ) : (
                <div className="container-sm">
            <Link className="return-back" to="/">Вернуться назад</Link>
            <div className="product row">

                <div className="product__image col-md-6">
                    <div className="product__image-img">
                        <img src={product.image} alt=""></img>
                    </div>
                </div>
            <div className="col-md-6">
                <form className="product__actions">
                    <div className="product__actions-raiting">
                        <Raiting raiting={product.raiting} numReviews={product.numReviews}/>
                    </div>
                    <div className="product__actions-title">
                        <span>{product.name}</span>
                    </div>
                    <div className="product__actions-price">
                        <span>{product.price} грн</span>
                    </div>
                    <div className="product__actions-instock">
                        <span>
                            {
                                product.instock === true ? (
                                    <span className="instock">В наличии</span>
                                ) : (
                                    <span className='nostock'>Нет в наличии</span>
                                )}
                        </span>
                    </div>
                    <div className="product__actions-cart">
                    {
                        product.instock === true && (
                            <button onClick={addToCart} type="submit" className="cart-button">
                                В корзину
                            </button>
                        )
                    }
                    {
                        product.instock === true && (
                            <select
                                className="cart-select"
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}>
                            {
                                [...Array(product.countInStock).keys()].map((x) => (
                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                ))
                            }
                        </select>
                        )
                    }
                    </div>
                    <div className="product__actions-descr">
                        <pre>
                        {product.descr}
                        </pre>
                    </div>
                </form>

                </div>
            </div>
        </div>
          )}
          <div>
            <Tabs></Tabs>
          </div>
      </div>
    );
}

export default ProductScreen;