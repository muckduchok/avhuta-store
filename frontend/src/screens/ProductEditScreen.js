import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct, updateProduct } from '../actions/products';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstans';

const ProductEditScreen = (props) => {
    const productId = props.match.params.id;
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [instock, setinstock] = useState('');
    const [brand, setBrand] = useState('');
    const [descr, setDescr] = useState('');
    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product} = productDetails;

    const productUpdate = useSelector((state) => state.productUpdate);
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = productUpdate;
    
    useEffect(() => {
        if (successUpdate) {
            dispatch({type: PRODUCT_UPDATE_RESET});
            props.history.push('/products');
        }
        if (!product || (product._id !== productId || successUpdate)) {
            dispatch({type: PRODUCT_UPDATE_RESET});
            dispatch(detailsProduct(productId));
        } else {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setinstock(product.instock);
            setBrand(product.brand);
            setDescr(product.descr);
        }
    }, [product, dispatch, productId, successUpdate, props.history ]);

    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');

    const submitDo = (e) => {
        e.preventDefault();

        dispatch(updateProduct({_id: productId,
        name, price, image, category, brand, countInStock, instock, descr}));
    };
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const uploadDo = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setLoadingUpload(true);
        try {
            const { data } = await Axios.post('/api/uploads', bodyFormData, {
                headers: {'Content-Type':'multipart/form-data',
                Authorization: `Bearer ${userInfo.token}`}
            });
            setImage(data);
            setLoadingUpload(false);
        } catch (error) {
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }

    };

    return (
        <div className="container">
            <h2>Редактирование продукта: {productId}</h2>
            
            <form className="form signin" onSubmit={submitDo}>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && <LoadingBox variant="danger">{error}</LoadingBox>}
                {loading ? <LoadingBox></LoadingBox>
                :
                error ? <MessageBox variant="danger">{error}</MessageBox>
                : <>
                    <div className="signin__name">
                        <label className="signin__name-label" htmlFor="name">Имя</label>
                        <input
                        className="signin__name-input"
                        id="name"
                        type="text"
                        placeholder="Введите имя"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)} >
                        </input>
                    </div>

                <div className="signin__login">
                    <label className="signin__login-label" htmlFor="price">Цена</label>
                    <input
                     className="signin__login-input"
                     id="price"
                     type="number"
                     required
                     value={price}
                     onChange={(e) => setPrice(e.target.value)} >
                    </input>
                </div>

                <div className="signin__login">
                    <label className="signin__login-label" htmlFor="image">Картинка</label>
                    <input
                     className="signin__login-input"
                     id="image"
                     type="text"
                     required
                     value={image}
                     onChange={(e) => setImage(e.target.value)} >
                    </input>
                    {loadingUpload && <MessageBox></MessageBox>}
                    {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>}
                </div>

                <div className="signin__login">
                <label className="signin__login-label" htmlFor="imageFile">Выберите картинку</label>
                    <input
                    className="signin__login-input upload-image"
                    type="file"
                    id="imageFile"
                    label="Choose Image"
                    onChange={uploadDo}>
                    </input>
                </div>

                <div className="signin__pass">
                    <label className="signin__pass-label" htmlFor="category">Категория</label>
                    <input 
                     className="signin__pass-input"
                     id="category"
                     type="text"
                     value={category}
                     required
                     onChange={(e) => setCategory(e.target.value)} >
                    </input>
                </div>

                <div className="signin__repass">
                    <label className="signin__repass-label" htmlFor="brand">Брэнд</label>
                    <input 
                     className="signin__repass-input"
                     id="brand"
                     type="text"
                     value={brand}
                     required
                     onChange={(e) => setBrand(e.target.value)} >
                    </input>
                </div>

                <div className="signin__repass">
                    <label className="signin__repass-label" htmlFor="countInStock">Количество</label>
                    <input 
                     className="signin__repass-input"
                     id="countInStock"
                     type="number"
                     value={countInStock}
                     required
                     onChange={(e) => setCountInStock(e.target.value)} >
                    </input>
                </div>

                <div className="signin__repass">
                    <label className="signin__repass-label" htmlFor="instock">Есть в наличии ?</label>
                    <input 
                     className="signin__repass-input"
                     id="instock"
                     type="boolean"
                     value={instock}
                     required
                     onChange={(e) => setinstock(e.target.value)} >
                    </input>
                </div>

                <div className="signin__repass">
                    <label className="signin__repass-label" htmlFor="descr">Описание</label>
                    <textarea
                     className="signin__repass-input"
                     id="descr"
                     rows="3"
                     type="text"
                     value={descr}
                     required
                     onChange={(e) => setDescr(e.target.value)} >
                    </textarea>
                </div>

                <div className="signin__button">
                    <label />
                    <button type="submit" className="button-submit">
                        Сохранить данные
                    </button>
                </div>
                </>
                }
            
            </form>
        </div>
    );
};

export default ProductEditScreen;