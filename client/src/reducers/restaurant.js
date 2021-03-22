import {
  REGISTER_RESTAURANT,
  SET_RESTAURANT,
  EDIT_RESTAURANT,
  GET_RESTAURANT_DATA,
} from '../constants/actions';

// Get token, set isAuthenticated and user to null, set loading to true.
const initialState = {
  restaurants: null,
  restaurant: null,
  loadingRestaurant: true,
  chartData: null,
};

export default function auth_red(state = initialState, action) {
  // Destructuring type and payload from action.
  const { type, payload } = action;

  switch (type) {
    case REGISTER_RESTAURANT:
    case EDIT_RESTAURANT:
    case SET_RESTAURANT:
      return { ...state, restaurant: payload, loadingRestaurant: false };
    case GET_RESTAURANT_DATA:
      return { ...state, chartData: payload, loadingRestaurant: false };
    default:
      // Do nothing.
      return state;
  }
}
