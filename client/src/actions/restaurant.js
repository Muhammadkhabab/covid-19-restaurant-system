import axios from 'axios';
import {
  REGISTER_RESTAURANT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SET_RESTAURANT,
  EDIT_RESTAURANT,
} from './types';
import { toast } from 'react-toastify';
import { loadUser } from './auth';

const API = 'api/v1';

// Register restaurant.
export const registerRestaurant = (userObj, restaurantObj) => async (
  dispatch
) => {
  // Request headers.
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Merge userObj, restaurantObj into one object
  const data = { ...userObj, ...restaurantObj };
  // User data.
  const body = JSON.stringify(data);

  try {
    // Send request to API endpoint.
    const res = await axios.post(`/${API}/restaurants`, body, config);

    // Call reducer to register restaurant.
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data.token,
    });

    // Call reducer to register restaurant.
    dispatch({
      type: REGISTER_RESTAURANT,
      payload: res.data.restaurant,
    });

    // Call reducer to load user.
    dispatch(loadUser());
    toast.success('You successfully registerd your restaurant! Welcome!');
  } catch (err) {
    // Loop through errors and notify user.
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        toast.error(error.msg);
        toast.error(error.param);
        console.log(error);
      });
    }

    // Call reducer to indicate fail registration.
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Edit restaurant.
export const editRestaurant = (restaurantObj) => async (dispatch) => {
  // Request headers.
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // User data.
  const body = JSON.stringify(restaurantObj);

  try {
    // Send request to API endpoint.
    const res = await axios.put(`/${API}/restaurants`, body, config);

    // Call reducer to register restaurant.
    dispatch({
      type: EDIT_RESTAURANT,
      payload: res.data,
    });
    toast.success('You successfully updated restaurant information! Welcome!');
  } catch (err) {
    // Loop through errors and notify user.
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        toast.error(error.msg);
        toast.error(error.param);
        console.log(error);
      });
    }
  }
};

export const getMyRestaurant = () => async (dispatch) => {
  try {
    // Send request to API endpoint.
    const res = await axios.get(`/${API}/restaurants/me`);

    // Call reducer to register restaurant.
    dispatch({
      type: SET_RESTAURANT,
      payload: res.data,
    });
  } catch (err) {
    // Loop through errors and notify user.
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        toast.error(error.msg);
        toast.error(error.param);
        console.log(error);
      });
    }
  }
};
