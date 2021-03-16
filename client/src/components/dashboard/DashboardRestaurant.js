import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getMyRestaurant } from '../../actions/restaurant';
import Spinner from '../layout/Spinner';

import { Card, CardTitle, Button } from 'reactstrap';

import '../../styles/Dashboard.scss';

const RestaurantDashboard = ({
  auth: { user, loading },
  restaurantObject: { restaurant, loadingRestaurant },
  getMyRestaurant,
}) => {
  useEffect(() => {
    // Get restaurant data when admin or staff logs in
    if (!restaurant && !loading && user && (user.is_admin || user.is_staff)) {
      getMyRestaurant();
    }

    // eslint-disable-next-line
  }, [user]);

  return loadingRestaurant ||
    loading ||
    user === null ||
    restaurant === null ? (
    <Spinner />
  ) : (
    <>
      <div className='admin-welcome mb-5'>
        <h1 className='text-danger m-0'>
          Welcome {user.first_name} {user.last_name}
        </h1>
        <Button color='danger'>Update Restaurant Information</Button>
      </div>
      <Card>
        <CardTitle tag='h3'>{restaurant.restaurant_name}</CardTitle>
      </Card>
    </>
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
};

export default connect(
  mapStateToProps,
  mapFunctionsToProps
)(RestaurantDashboard);
