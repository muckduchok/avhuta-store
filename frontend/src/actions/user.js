import Axios from 'axios';
import {
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL, USER_SIGNOUT,
  USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL, USER_DETAILS_REQUEST,
  USER_DETAILS_FAIL, USER_DETAILS_SUCCESS,
  USER_UPDATE_DETAILS_REQUEST, USER_UPDATE_DETAILS_SUCCESS,
  USER_UPDATE_DETAILS_FAIL, USER_LIST_REQUEST,
  USER_LIST_SUCCESS, USER_LIST_FAIL,
  USER_DELETE_REQUEST, USER_DELETE_FAIL,
  USER_DELETE_SUCCESS, USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS, USER_EDIT_FAIL,
} from '../constants/userConstants';

export const signin = (email, password) => async (dispatch) => {
  dispatch({
    type: USER_SIGNIN_REQUEST,
    payload: { email, password },
  });

  try {
    const { data } = await Axios.post('/api/users/signin', { email, password });
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register = (name, email, phone, password) => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: { email, phone, password },
  });

  try {
    const { data } = await Axios.post('/api/users/register', {
      name, email, phone, password,
    });
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingAddress');
  dispatch({ type: USER_SIGNOUT });
};

export const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch({
    type: USER_DETAILS_REQUEST,
    payload: userId,
  });

  const { userSignin: { userInfo } } = getState();

  try {
    const { data } = await Axios.get(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;

    dispatch({
      type: USER_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({
    type: USER_UPDATE_DETAILS_REQUEST,
    payload: user,
  });
  const { userSignin: { userInfo } } = getState();
  try {
    const { data } = await Axios.put('/api/users/profile', user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({
      type: USER_UPDATE_DETAILS_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({
      type: USER_UPDATE_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const listUsers = () => async (dispatch, getState) => {
  dispatch({ type: USER_LIST_REQUEST });
  const { userSignin: { userInfo } } = getState();
  try {
    const { data } = await Axios.get('/api/users', {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({
      type: USER_LIST_FAIL,
      payload: message,
    });
  }
};

export const deleteUser = (userId) => async (dispatch, getState) => {
  dispatch({
    type: USER_DELETE_REQUEST,
    payload: userId,
  });
  const { userSignin: { userInfo } } = getState();

  try {
    const { data } = await Axios.delete(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({
      type: USER_DELETE_FAIL,
      payload: message,
    });
  }
};

export const editUser = (user) => async (dispatch, getState) => {
  dispatch({
    type: USER_EDIT_REQUEST,
    payload: user,
  });
  const { userSignin: { userInfo } } = getState();
  try {
    const { data } = await Axios.put(`/api/users/${user._id}`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({
      type: USER_EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({
      type: USER_EDIT_FAIL,
      payload: message,
    });
  }
};
