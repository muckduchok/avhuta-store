import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { useDispatch, useSelector } from 'react-redux';
import { createReview, detailsProduct } from '../actions/products';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import Raiting from './Raiting';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstans';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <span>{children}</span>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'theme.palette.background.paper',
  },
}));

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const dispatch = useDispatch();
  const productId = props.match.params.id;

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    error: errorReviewCreate,
    loading: loadingReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [raiting, setRaiting] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (successReviewCreate) {
      window.alert('Комментарий добавлен');
      setRaiting('');
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const submitDo = (e) => {
    e.preventDefault();
    if (comment && raiting) {
      dispatch(createReview(productId, { raiting, comment, name: userInfo.name }));
    } else {
      alert('Пожалуйста введите комментарий и рейтинг');
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs className="tabs" centered value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Описание" {...a11yProps(0)} />
          <Tab label="Характеристики" {...a11yProps(1)} />
          <Tab label="Отзывы" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel className="tabs-app" value={value} index={0}>
        <div>
          {loading ? (<LoadingBox />) : error ? (<MessageBox>{error}</MessageBox>) : (
            <pre className="pretabs">
              {product.description}
            </pre>
          )}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div>
          {loading ? (<LoadingBox />) : error ? (<MessageBox>{error}</MessageBox>) : (
            <pre className="pretabs">
              {product.characteristics}
            </pre>
          )}
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div>
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox>{error}</MessageBox>
          ) : (
            <div className="comments">
              {product.reviews.length === 0 && (<MessageBox>Еще нет отзывов</MessageBox>)}
              <ul className="comments__ul">
                {product.reviews.map((review) => (
                  <li className="comments__li" key={review._id}>
                    <strong>{review.name}</strong>
                    <Raiting raiting={review.raiting} caption=" " />
                    <p>
                      {' '}
                      {review.createdAt.substring(0, 10)}
                    </p>
                    <p>
                      {' '}
                      {review.comment}
                    </p>
                  </li>
                ))}

              </ul>
            </div>
          )}
          {userInfo ? (
            <form className="form-comment signin" onSubmit={submitDo}>
              <h4>Напишите свой отзыв</h4>
              <div className="form-comment__raiting">
                <label htmlFor="raiting" />
                <select
                  className="form-comment__raiting-select"
                  id="raiting"
                  value={raiting}
                  onChange={(e) => setRaiting(e.target.value)}
                >
                  <option value="">Выбрать рейтинг...</option>
                  <option value="1">1 - звезда</option>
                  <option value="2">2 - звезды</option>
                  <option value="3">3 - звезды</option>
                  <option value="4">4 - звезды</option>
                  <option value="5">5 - звезд</option>
                </select>
              </div>

              <div className="form-comment__textarea signin__name">
                <label className="signin__name-label" htmlFor="comment">Комментарий</label>
                <textarea
                  className="signin__name-input"
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <div className="signin__button">
                  <label />
                  <button className="button-submit" type="submit">
                    Отправить
                  </button>
                </div>

              </div>
              <div>
                {loadingReviewCreate && <LoadingBox />}
                {errorReviewCreate && <MessageBox variant="danger">{errorReviewCreate}</MessageBox>}
              </div>
            </form>
          ) : (
            <MessageBox>Вы не зарегистрированы</MessageBox>
          )}
        </div>
      </TabPanel>
    </div>
  );
}
