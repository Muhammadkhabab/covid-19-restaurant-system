import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  AUTH_ERROR,
  LOGOUT,
} from './types';
import setAuthToken from '../utils/setAuthToken';
import { toast } from 'react-toastify';

const API = 'api/v1';

// Load user.
export const loadUser = () => async (dispatch) => {
  // Check for token and set it.
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    // Send request to API endpoints.
    const res = await axios.get(`/${API}/auth`);

    // Call reducer to load user.
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    // Loop through errors and notify user.
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }

    // Call reducer to indicate authentication error.
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register user.
export const register = (userObj) => async (dispatch) => {
  // Request headers.
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // User data.
  const body = JSON.stringify(userObj);

  try {
    // Send request to API endpoint.
    const res = await axios.post(`/${API}/users`, body, config);

    // Call reducer to register user.
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    // Call reducer to load user.
    dispatch(loadUser());
    toast.success(
      'You successfully created an account! Welcome to Badger Bytes!'
    );
  } catch (err) {
    // Loop through errors and notify user.
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }

    // Call reducer to indicate fail registration.
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login user.
export const login = ({ email, password }) => async (dispatch) => {
  // Request headers.
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // User data.
  const body = JSON.stringify({ email, password });

  try {
    // Send request to API endpoint.
    const res = await axios.post(`/${API}/auth`, body, config);

    // Call reducer to login user.
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    // Call reducer to load user.
    dispatch(loadUser());

    toast.success('You successfully signed in! Welcome back!');
  } catch (err) {
    console.log('error in login');
    console.log(err);
    console.log(err.response);
    // Loop through errors and notify user.
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }

    // Call reducer to remove auth token.
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Update user.
export const updateUser = (userObj) => async (dispatch) => {
  try {
    // Request headers.
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // User data.
    const body = JSON.stringify(userObj);

    // Send request to API endpoint.
    const res = await axios.put(`/${API}/users`, body, config);

    // Call reducer to update user.
    dispatch({
      type: UPDATE_SUCCESS,
      payload: res.data.user,
    });

    toast.success('You successfully updated your information!');
  } catch (err) {
    // Loop through errors and notify user.
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }

    // Call reducer to indicate fail registration.
    dispatch({
      type: UPDATE_FAIL,
    });
  }
};

// Logout user.
export const logout = () => async (dispatch) => {
  // Call reducer to logout user.
  dispatch({ type: LOGOUT });
};
