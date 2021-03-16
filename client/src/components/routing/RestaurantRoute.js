import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ROUTE_LOGIN, ROUTE_DASHBOARD_USER } from '../../constants/routes';
import Spinner from '../layout/Spinner';

const RestaurantRoute = ({
  component: Component,
  auth: { isAuthenticated, user, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      loading ? (
        <Spinner />
      ) : !isAuthenticated ? (
        <Redirect to={ROUTE_LOGIN} />
      ) : user.is_admin || user.is_staff ? (
        <Component {...props} />
      ) : (
        <Redirect to={ROUTE_DASHBOARD_USER} />
      )
    }
  />
);

RestaurantRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(RestaurantRoute);
