import React, { useEffect, useState} from 'react';
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

    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

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
        <div className="search">
            {loading ? (<LoadingBox></LoadingBox>)
            : error ? <MessageBox variant="danger">{error}</MessageBox>
            : <div className="container-sm filter">
                <button onClick={() => setSidebarIsOpen(true)} type="button" className="filter-button">
                  <span className="icon-burger"><i className="bi bi-sliders"></i></span>
                  Фильтры
                </button>

                <div className="filter-sort">
                  Сортировка <i className="bi bi-filter"></i>
                  <select
                  value={order}
                  onChange={(e) => {
                      props.history.push(getFilterUrl({order: e.target.value})) }}
                  className="form-select filter-select" aria-label="Default select example">
                    <option value="newest">По новым</option>
                    <option value="lowest">По возростанию цены</option>
                    <option value="highest">По убыванию цены</option>
                    <option value="toprated"> По рейтингу</option>
                  </select>
                </div>
              </div>
            }
              
                <aside className={sidebarIsOpen ? 'open' : ''}>
                  <ul>
                    <li>
                    <h3>Категории</h3>
                    <button className="close-sidebar" type="button" onClick={() => setSidebarIsOpen(false)}><i className="bi bi-x-circle-fill"></i></button>
                    </li>
                      <li>
                        {loadingCategories ? (
                        <LoadingBox></LoadingBox>
                        ) : errorCategories ? (
                        <MessageBox variant="danger">{errorCategories}
                        </MessageBox>
                        ) : (
                          <div className="categoriess">
                            <div>
                            <Link className={'all' === category ? 'active' : ''} to={getFilterUrl({category: 'all'})}>Все</Link>
                            </div>
                               {categories.map((cat) => (
                                   <div className="category-li" key={cat}>
                                    <Link className={cat === category ? 'active' : ''} to={getFilterUrl({category: cat})}>{cat}</Link>
                                   </div>
                               ))}
                          </div>
                        )}
                      </li>
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
                      </ul>
                </aside>
                <div className="container-sm">
                <div className="row product__content">

                    <div className="col">
                    {loading ? (
                    <LoadingBox></LoadingBox>
                    ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                        <div>
                            {loading ? (<LoadingBox></LoadingBox>
                            ) : error ? (<MessageBox>{error}</MessageBox>
                            ) : (
                            <div className="row">
                              {products.map(product => (
                                  <Product {...props} key={product._id} product={product} />
                                ))}
                            </div>
                               )}
                        </div>
                    )}
                    </div>
                </div>
                </div>
        </div>
    );
};

export default SearchScreen;