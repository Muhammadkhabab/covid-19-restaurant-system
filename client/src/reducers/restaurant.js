import {
	REGISTER_RESTAURANT
} from '../actions/types';

// Get token, set isAuthenticated and user to null, set loading to true.
const initialState = {
	restaurants: null,
	restaurant: null,
	loadingRestaurant: true,
};

export default function auth_red(state = initialState, action) {
	// Destructuring type and payload from action.
	const { type, payload } = action;

	switch (type) {
		case REGISTER_RESTAURANT:
			return { ...state, restaurant: payload, loadingRestaurant: false }
		default:
			// Do nothing.
			return state;
	}
}
