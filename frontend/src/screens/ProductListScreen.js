import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, deleteProduct, listProducts } from '../actions/products';
import { Link} from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstans';

const ProuductListScreen = (props) => {
    const productList = useSelector((state) => state.productList);
    const {loading, error, products} = productList;
    const productCreate = useSelector((state) => state.productCreate);
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = productCreate;
    const productDelete = useSelector((state) => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete;

    const dispatch = useDispatch();
    useEffect(() => {
        if(successCreate){
            dispatch({type: PRODUCT_CREATE_RESET});
            props.history.push(`/product/${createdProduct._id}/edit`)
        }
        if(successDelete) {
            dispatch({type: PRODUCT_DELETE_RESET});
        }
        dispatch(listProducts({}));
    }, [createdProduct, dispatch, props.history, successCreate, successDelete]);

    const deleteItem = (product) => {
        if (window.confirm('Вы уверены ?')) {
            dispatch(deleteProduct(product._id));
        }
    };

    const createItem = () => {
        dispatch(createProduct());
    }

    return (
        <div className="product__content container-sm">
            <button onClick={createItem} type="button" className="btn btn-outline-dark">Добавить</button>
            
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

            {loadingCreate && <LoadingBox></LoadingBox>}
            {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
            
            <h2>Список товаров</h2>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
            ) : (
            <div className="row">
            {
                products.map(product => (
                    <div key={product._id} className="col col-md-3">
                        <div className="card">
                            <div className="card__img">
                                <Link className="card__img-image" to={`/product/${product._id}`}>
                                    <img className="card-img-top" src={product.image} alt={product.name}>
                                    </img>
                                </Link>
                            </div>

            <Link to={`/product/${product._id}`} className="card__title">
                <span className="card__title-text">{product.name}</span>
            </Link>

            <div className="card__collection">
                <div className="card__collection-price">
                    <span className="card__collection-price-text">{product.price} грн</span>
                </div>
            <div className="card__collection-cart">
                <button onClick={() => props.history.push(`/product/${product._id}/edit`)} className="button-cart">
                    <i className="bi bi-pencil-square" />
                </button>
                <button type="button" onClick={() => deleteItem(product)} className="button-cart button-delete">
                    <i className="bi bi-trash" />
                </button>
            </div>
            </div>
        </div>
        </div>
    ))}
        </div>
            )}
        </div>
    );
};

export default ProuductListScreen;