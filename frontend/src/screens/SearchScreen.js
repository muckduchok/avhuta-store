import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { listProducts } from '../actions/products';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import Raiting from '../components/Raiting';
import { prices, raitings } from '../utils';

const SearchScreen = (props) => {
    const {name = 'all', category = 'all', min = 0, max = 0, raiting = 0, order = ''} = useParams();
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
    const productCategoryList = useSelector((state) => state.categoryList);
    const { loading: loadingCategories, error: errorCategories, categories } = productCategoryList;

    useEffect(() => {
        dispatch(listProducts({
          name: name !== 'all' ? name: '',
          category: category !== 'all' ? category: '',
          min,
          max,
          raiting,
          order
        }));
    }, [dispatch, name, category, min, max, raiting, order]);

    const getFilterUrl = (filter) => {
        const filterCategory = filter.category || category;
        const filterName = filter.name || name;
        const filterRaiting = filter.raiting || raiting;
        const sortOrder = filter.order || order;
        const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
        const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
        return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/raiting/${filterRaiting}/order/${sortOrder}`;
    };

    return (
        <div className="container search">
            {loading ? (<LoadingBox></LoadingBox>)
            : error ? <MessageBox variant="danger">{error}</MessageBox>
            : <div> Найдено ={products.length} </div>
            }
                <div>
                  Фильтровать по { ' '}
                  <select
                  onChange={(e) => {
                      props.history.push(getFilterUrl({order: e.target.value})) }}
                  value={order}>
                    <option value="newest"> Новые </option>
                    <option value="lowest"> От дешевых до дорогих </option>
                    <option value="highest"> От дорогих до дешевых </option>
                    <option value="toprated"> По рейтингу </option>
                  </select>
                </div>
                <div className="row product__content">
                    <div className="col-md-2">
                        <h3>Категории</h3>
                      <div>
                        {loadingCategories ? (
                        <LoadingBox></LoadingBox>
                        ) : errorCategories ? (
                        <MessageBox variant="danger">{errorCategories}
                        </MessageBox>
                        ) : (
                          <ul className="category-ul">
                            <li className="category-li">
                            <Link className={'all' === category ? 'active' : ''} to={getFilterUrl({category: 'all'})}>Все</Link>
                            </li>
                               {categories.map((cat) => (
                                   <li className="category-li" key={cat}>
                                    <Link className={cat === category ? 'active' : ''} to={getFilterUrl({category: cat})}>{cat}</Link>
                                   </li>
                               ))}
                          </ul>
                        )}
                      </div>
                      <div>
                        <h3>Цена</h3>
                        <ul>
                          {prices.map((p) => (
                            <li key={p.name}>
                              <Link
                              className={`${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''}
                              to={getFilterUrl({min: p.min, max: p.max})}>
                                {p.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3>Рейтинг</h3>
                        <ul>
                          {raitings.map((r) => (
                            <li key={r.name}>
                              <Link
                                className={`${r.raiting}` === `${raiting}` ? 'active' : ''}
                                to={getFilterUrl({raiting: r.raiting})}>
                                  <Raiting caption={" и выше"} raiting={r.raiting}></Raiting>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="col-sm-9">
                    {loading ? (
                    <LoadingBox></LoadingBox>
                    ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                        <div>
                            {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox>{error}</MessageBox>
          ) : (
            <div className="row">
          {
            products.map(product => (
              <Product key={product._id} product={product} />
            ))}
        </div>
          )}
                        </div>
                    )}
                    </div>
                </div>
        </div>
    );
};

export default SearchScreen;