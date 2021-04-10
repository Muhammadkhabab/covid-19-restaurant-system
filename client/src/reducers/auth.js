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
} from '../constants/actions';

// Get token, set isAuthenticated and user to null, set loading to true.
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  user: null,
  loading: true,
};

export default function auth_red(state = initialState, action) {
  // Destructuring type and payload from action.
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      // Set isAuthenticated to true, loading to false and set user.
      return { ...state, isAuthenticated: true, loading: false, user: payload };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      // Add token to local storage.
      localStorage.setItem('token', payload);
      // Set isAuthenticated to true and loading to false.
      return { ...state, isAuthenticated: true, loading: true };
    case UPDATE_SUCCESS:
      return { ...state, user: payload };
    case UPDATE_FAIL:
      return { ...state, loading: false };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      // Remove token from local storage.
      localStorage.removeItem('token');
      // Set token to null, isAuthenticated to false and loading to false.
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      // Do nothing.
      return state;
  }
}
