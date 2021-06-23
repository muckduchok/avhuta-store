import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, editUser } from '../actions/user';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_EDIT_RESET } from '../constants/userConstants';

const UserEditScreen = (props) => {
  const userId = props.match.params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userEdit = useSelector((state) => state.userEdit);
  const { loading: loadingEdit, error: errorEdit, success: successEdit } = userEdit;

  useEffect(() => {
    if (successEdit) {
      dispatch({ type: USER_EDIT_RESET });
      props.history.push('/users');
    }
    if (!user) {
      dispatch(detailsUser(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, userId, user, props.history, successEdit]);

  const submitDo = (e) => {
    e.preventDefault();

    dispatch(editUser({
      _id: userId, name, email, phone, isAdmin,
    }));
  };

  return (
    <div className="container">
      <h2>
        Редактирование пользователя:
        {name}
      </h2>
      <form className="signin" onSubmit={submitDo}>
        {loadingEdit && <LoadingBox />}
        {errorEdit && <MessageBox variant="danger">{errorEdit}</MessageBox>}
        {loading ? <LoadingBox />
          : error ? <MessageBox variant="danger">{error}</MessageBox>
            : (
              <>
                <div className="signin__name">
                  <label className="signin__name-label" htmlFor="name">Имя</label>
                  <input
                    className="signin__name-input"
                    id="name"
                    type="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="signin__login">
                  <label className="signin__login-label" htmlFor="email">Email</label>
                  <input
                    className="signin__login-input"
                    id="email"
                    type="email"
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div>
                  <label className="signin__login-label" htmlFor="isAdmin">Админ</label>
                  <input
                    className="signin__login-checkbox"
                    id="isAdmin"
                    type="checkbox"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  />
                </div>

                <div className="signin__button">
                  <label />
                  <button type="submit" className="button-submit">
                    Обновить данные
                  </button>
                </div>
              </>
            )}
      </form>
    </div>
  );
};

export default UserEditScreen;
