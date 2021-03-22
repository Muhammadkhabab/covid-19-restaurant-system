import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RestaurantProfile from './RestaurantProfile';
import { getRestaurantById } from '../../actions/restaurant';

const Restaurant = ({ match, restaurantObject: { restaurant } }) => {
  useEffect(() => {
    if (!restaurant || restaurant._id !== match.params.restaurant_id) {
      getRestaurantById(match.params.restaurant_id);
    }

    // eslint-disable-next-line
  }, []);

  return (
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
