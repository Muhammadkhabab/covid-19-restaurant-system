import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RestaurantProfile from './RestaurantProfile';
import { getRestaurantById } from '../../actions/restaurant';
import Spinner from '../layout/Spinner';

const Restaurant = ({
  match,
  restaurantObject: { restaurant, loadingRestaurant },
  getRestaurantById,
}) => {
  useEffect(() => {
    if (!restaurant || restaurant._id !== match.params.restaurant_id) {
      getRestaurantById(match.params.restaurant_id);
    }

    // eslint-disable-next-line
  }, []);

  return loadingRestaurant || !restaurant ? (
    <Spinner />
  ) : (
    <div>
      <RestaurantProfile restObj={restaurant} />
    </div>
  );
};

Restaurant.propTypes = {
  restaurantObject: PropTypes.object.isRequired,
  getRestaurantById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  restaurantObject: state.restaurant,
});

const mapFunctionsToProps = {
  getRestaurantById,
};

export default connect(mapStateToProps, mapFunctionsToProps)(Restaurant);
