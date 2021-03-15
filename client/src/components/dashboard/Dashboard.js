import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getMyRestaurant } from '../../actions/restaurant';
import Spinner from '../layout/Spinner';


const RestaurantDashboard = ({ auth: { user, loading }, restaurantObject: { restaurant, loadingRestaurant }, getMyRestaurant }) => {
	useEffect(() => {
		// Get restaurant data when admin or staff logs in
		if (!restaurant && (user.is_admin || user.is_staff)) {
			getMyRestaurant();
		}
	})

	return loadingRestaurant || loading || user === null || restaurant === null ? <Spinner /> :
		(
			<>
				<h3>hello world!</h3>
			</>
		)
};

RestaurantDashboard.propTypes = {
	restaurantObject: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	getMyRestaurant: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	restaurantObject: state.restaurant,
});

const mapFunctionsToProps = {
	getMyRestaurant
};

export default connec(mapStateToProps, mapFunctionsToProps)(RestaurantDashboard);