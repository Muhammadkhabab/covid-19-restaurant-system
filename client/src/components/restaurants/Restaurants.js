import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import RestaurantCard from './RestaurantCard';
import { getAllRestaurants } from '../../actions/restaurant';
import { Container, Row, Col } from 'reactstrap';
import AdvancedSearch from './AdvancedSearch';
import Subscribe from './Subscribe';

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

  const [leftActive, setLeftActive] = useState(false);

  return loadingRestaurant || restaurants === null ? (
    <Spinner />
  ) : (
    <Container id='restaurants-page' className='my-4'>
      <div>
        <Row>
          <Col className='pr-0'>
            <div
              className={`tab tab-left ${
                leftActive ? 'tab-active' : 'tab-non-active'
              }`}
              onClick={() => setLeftActive(true)}
            >
              <p>Search</p>
            </div>
          </Col>
          <Col className='pl-0'>
            <div
              className={`tab tab-right ${
                leftActive ? 'tab-non-active' : 'tab-active'
              }`}
              onClick={() => setLeftActive(false)}
            >
              <p>Subscribe</p>
            </div>
          </Col>
        </Row>
      </div>
      {leftActive ? (
        <div>
          <AdvancedSearch restaurants={restaurants} />
          <h4>Search results: {restaurants.length}</h4>
          {restaurants.map((r, k) => {
            return <RestaurantCard key={k} restObj={r} />;
          })}
        </div>
      ) : (
        <Subscribe />
      )}
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
