import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import RestaurantCard from './RestaurantCard';
import { getAllRestaurants } from '../../actions/restaurant';
import { Container } from 'reactstrap';
import AdvancedSearch from './AdvancedSearch';

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
    <Container className='my-4'>
      <h2 class="text-center">Dine and Stay Safe. </h2>
      <AdvancedSearch restaurants={restaurants} />
      <h4>Search results: {restaurants.length}</h4>
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
