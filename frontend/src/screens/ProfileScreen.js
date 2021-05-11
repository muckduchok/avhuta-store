import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/user';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_DETAILS_RESET } from '../constants/userConstants';

const ProfileScreen = () => {
    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} = userSignin;
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate} = userUpdateProfile;
    const dispatch = useDispatch();
    

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        if (!user) {
            dispatch({type: USER_UPDATE_DETAILS_RESET});
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
            dispatch(updateUserProfile({userId: user._id, name, email, phone, password}));
        }
    };

    return (
        <div className="container">
            <h2>Ваш профиль</h2>
            <form className="form signin" onSubmit={submitDo}>
            {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate&& (
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
                        onChange={(e) => setName(e.target.value)} >
                        </input>
                    </div>

                <div className="signin__login">
                    <label className="signin__login-label" htmlFor="email">Email</label>
                    <input
                     className="signin__login-input"
                     id="email"
                     type="email"
                     required
                     value={email}
                     onChange={(e) => setEmail(e.target.value)} >
                    </input>
                </div>

                <div className="signin__login">
                    <label className="signin__login-label" htmlFor="phone">Номер телефона</label>
                    <input
                     className="signin__login-input"
                     id="phone"
                     type="phone"
                     required
                     value={user.phone}
                     onChange={(e) => setPhone(e.target.value)} >
                    </input>
                </div>


                <div className="signin__pass">
                    <label className="signin__pass-label" htmlFor="password">Пароль</label>
                    <input 
                     className="signin__pass-input"
                     id="password"
                     type="password"
                     required
                     onChange={(e) => setPassword(e.target.value)} >
                    </input>
                </div>

                <div className="signin__repass">
                    <label className="signin__repass-label" htmlFor="password">Подтвердите пароль</label>
                    <input 
                     className="signin__repass-input"
                     id="confirmPassword"
                     type="password"
                     required
                     onChange={(e) => setConfirmPassword(e.target.value)} >
                    </input>
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