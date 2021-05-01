/* istanbul ignore file */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getMyRestaurant,
  updateStatsRestaurant,
} from '../../actions/restaurant';
import Spinner from '../layout/Spinner';
import RestaurantProfile from '../restaurants/RestaurantProfile';

import '../../styles/Dashboard.scss';

const RestaurantDashboard = ({
  auth: { user, loading },
  restaurantObject: { dashboardRestaurant, loadingRestaurant },
  getMyRestaurant,
  updateStatsRestaurant,
}) => {
  useEffect(() => {
    // Get restaurant data when admin or staff logs in
    if (
      !dashboardRestaurant &&
      !loading &&
      user &&
      (user.is_admin || user.is_staff)
    ) {
      getMyRestaurant();
    }

    // eslint-disable-next-line
  }, [user]);

  return loadingRestaurant ||
    loading ||
    user === null ||
    dashboardRestaurant === null ? (
    <Spinner />
  ) : (
    <RestaurantProfile
      restObj={dashboardRestaurant}
      user={user}
      update={updateStatsRestaurant}
    />
  );
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
  getMyRestaurant,
  updateStatsRestaurant,
};

export default connect(
  mapStateToProps,
  mapFunctionsToProps
)(RestaurantDashboard);
