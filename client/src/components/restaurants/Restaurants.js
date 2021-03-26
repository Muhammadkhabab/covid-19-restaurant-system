import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import RestaurantCard from './RestaurantCard';
import { getAllRestaurants } from '../../actions/restaurant';
import { Container } from 'reactstrap';

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

  return loadingRestaurant || restaurants === null ? (
    <Spinner />
  ) : (
    <Container>
      {restaurants.map((r, k) => {
        return <RestaurantCard key={k} restObj={r} />;
      })}
    </Container>
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
