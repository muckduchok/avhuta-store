import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, useParams } from 'react-router-dom';
import { listProducts } from '../actions/products';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import Raiting from '../components/Raiting';
import SearchBox from '../components/SearchBox';
import { prices, raitings } from '../utils';

const SearchScreen = (props) => {
  const {
    name = 'all',
    category = 'all',
    min = 0,
    max = 0,
    raiting = 0,
    order = 'newest',
    pageNumber = 1,
  } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const {
    loading, error, products, page, pages,
  } = productList;
  const productCategoryList = useSelector((state) => state.categoryList);
  const { loading: loadingCategories, error: errorCategories, categories } = productCategoryList;

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  useEffect(() => {
    dispatch(listProducts({
      pageNumber,
      name: name !== 'all' ? name : '',
      category: category !== 'all' ? category : '',
      min,
      max,
      raiting,
      order,
    }));
  }, [dispatch, name, category, min, max, raiting, order, pageNumber]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterRaiting = filter.raiting || raiting;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/raiting/${filterRaiting}/order/${sortOrder}/pageNumber/${filterPage}`;
  };

  return (
    <div className="main">
      <aside id="style-1" className={sidebarIsOpen ? 'opens aside' : ''}>
        <ul>
          <li>
            <h3>Категории</h3>
            <button className="close-sidebar" type="button" onClick={() => setSidebarIsOpen(false)}>
              <i className="bi bi-x-circle-fill" />
            </button>
          </li>
          <li>
            {loadingCategories ? (
              <LoadingBox />
            ) : errorCategories ? (
              <MessageBox variant="danger">
                {errorCategories}
              </MessageBox>
            ) : (
              <div className="categoriess">
                <div className="category-li">
                  <Link onClick={() => setSidebarIsOpen(false)} className={category === 'all' ? 'active' : ''} to={getFilterUrl({ category: 'all' })}>Все</Link>
                </div>
                {categories.map((cat) => (
                  <div className="category-li" key={cat}>
                    <Link onClick={() => setSidebarIsOpen(false)} className={cat === category ? 'active' : ''} to={getFilterUrl({ category: cat })}>{cat}</Link>
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
                    onClick={() => setSidebarIsOpen(false)}
                    className={`${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''}
                    to={getFilterUrl({ min: p.min, max: p.max })}
                  >
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
                    onClick={() => setSidebarIsOpen(false)}
                    className={`${r.raiting}` === `${raiting}` ? 'active' : ''}
                    to={getFilterUrl({ raiting: r.raiting })}
                  >
                    <Raiting caption=" и выше" raiting={r.raiting} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </ul>
      </aside>
      <div className="search">
        <div className="container-sm phone-search">
          <Route render={({ history }) => <SearchBox history={history} />} />
        </div>
        {loading ? (<LoadingBox />)
          : error ? (<MessageBox variant="danger">{error}</MessageBox>)
            : (
              <div className="container-sm filter">
                <button onClick={() => setSidebarIsOpen(true)} type="button" className="filter-button">
                  <span className="icon-burger"><i className="bi bi-sliders" /></span>
                  Фильтры
                </button>

                <div className="filter-sort">
                  Сортировка
                  {' '}
                  <i className="bi bi-filter" />
                  <select
                    value={order}
                    onChange={(e) => {
                      props.history.push(getFilterUrl({ order: e.target.value }));
                    }}
                    className="form-select filter-select"
                    aria-label="Default select example"
                  >
                    <option value="newest">По новым</option>
                    <option value="lowest">По возростанию цены</option>
                    <option value="highest">По убыванию цены</option>
                    <option value="toprated"> По рейтингу</option>
                  </select>
                </div>
              </div>
            )}

        <div className="container-sm">
          <div className="row product__content">

            <div className="col">
              {loading ? (
                <LoadingBox />
              ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
              ) : (
                <div className="row">
                  {products.map((product) => (
                    <Product {...props} key={product._id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="row center pagination">
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === page ? 'active' : ''}
                key={x + 1}
                to={getFilterUrl({ page: x + 1 })}
              >
                {x + 1}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchScreen;
