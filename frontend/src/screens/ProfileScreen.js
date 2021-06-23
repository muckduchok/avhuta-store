import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { USER_UPDATE_DETAILS_RESET } from '../constants/userConstants';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { detailsUser, signout, updateUserProfile } from '../actions/user';

const ProfileScreen = () => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdateProfile;
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const signoutDo = () => {
    dispatch(signout());
  };

  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_DETAILS_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user]);

  const submitDo = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Пароли не совпадают. Повторие попытку еще раз!');
    } else {
      dispatch(updateUserProfile({
        userId: user._id, name, email, phone, password,
      }));
    }
  };

  return (
    <div className="container">
      <h2>Ваш профиль</h2>

      <Accordion className="accordions">
        <AccordionSummary className="accordion" expandIcon={<ExpandMoreIcon />}>
          <Typography>Личный кабинет</Typography>
        </AccordionSummary>
        <AccordionDetails className="accordion-next">
          <div className="signin__button accordion__button">
            <button
              role="link"
              className=" accordion-button"
              type="button"
            >
              <Link to="/orderhistory">История</Link>
              {' '}
              <br />
            </button>
          </div>
          <div className="signin__button accordion__button">
            <button
              role="link"
              className="accordion-button"
              type="button"
            >
              <Link to="#signout" onClick={signoutDo}>Выйти</Link>
            </button>
          </div>
        </AccordionDetails>
      </Accordion>

      <form className="form signin" onSubmit={submitDo}>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox />}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && <MessageBox variant="success">Профиль успешно сохранен</MessageBox>}
            <div className="signin__name">
              <label className="signin__name-label" htmlFor="name">Имя</label>
              <input
                className="signin__name-input"
                id="name"
                type="text"
                placeholder="Введите имя"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="signin__login">
              <label className="signin__login-label" htmlFor="email">Email</label>
              <input
                className="signin__login-input"
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="signin__login">
              <label className="signin__login-label" htmlFor="phone">Номер телефона</label>
              <input
                className="signin__login-input"
                id="phone"
                type="phone"
                required
                value={user.phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="signin__pass">
              <label className="signin__pass-label" htmlFor="password">Пароль</label>
              <input
                className="signin__pass-input"
                id="password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="signin__repass">
              <label className="signin__repass-label" htmlFor="password">Подтвердите пароль</label>
              <input
                className="signin__repass-input"
                id="confirmPassword"
                type="password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="signin__button">
              <label />
              <button type="submit" className="button-submit">
                Сохранить данные
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default ProfileScreen;
