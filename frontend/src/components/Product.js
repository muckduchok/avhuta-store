import React from 'react';
import { Link } from 'react-router-dom';
import Raiting from './Raiting';

export default function Product(props) {
    const { product } = props;
    const addToCart = () => {
        props.history.push(`/cart/${product._id}`);
        props.history.goBack();
    }

    return (
        <div key={product._id} className="col">
        <div className="card">
        <div className="card__img">
            <Link className="card__img-image" to={`/product/${product._id}`}>
            <img className="card-img-top" src={product.image} alt={product.name}></img>
            </Link>
        </div>

        <Link to={`/product/${product._id}`} className="card__title">
            <span className="card__title-text">{product.name}</span>
        </Link>

        <Raiting raiting={product.raiting} numReviews={product.numReviews}/>

        <div className="card__collection">
            <div className="card__collection-price">
            <span className="card__collection-price-text">{product.price} грн</span>
            </div>
            <div className="card__collection-cart">
            <button type="submit" onClick={addToCart} className="button-cart">
                <i className="bi bi-cart-plus" />
            </button>
            </div>
        </div>
        </div>
        </div>
    )
}