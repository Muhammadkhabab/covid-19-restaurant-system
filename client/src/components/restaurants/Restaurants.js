import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import RestaurantCard from './RestaurantCard';
import { getAllRestaurants } from '../../actions/restaurant';

const Restaurants = ({
  restaurantObject: { restaurants, loadingRestaurant },
  getAllRestaurants,
}) => {
  useEffect(() => {
    if (!restaurants) {
      getAllRestaurants();
    }

    // eslint-disable-next-line
  }, []);

  return loadingRestaurant ? (
    <Spinner />
  ) : (
    <div>
      {restaurants.map((item) => {
        return <RestaurantCard restObj={item} />;
      })}
    </div>
  );
};

Restaurants.propTypes = {
  restaurantObject: PropTypes.object.isRequired,
  getAllRestaurants: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  restaurantObject: state.restaurant,
});

const mapFunctionsToProps = {
  getAllRestaurants,
};

export default connect(mapStateToProps, mapFunctionsToProps)(Restaurants);
