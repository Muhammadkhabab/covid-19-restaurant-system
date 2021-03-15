import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  ROUTE_LOGIN,
  ROUTE_DASHBOARD_RESTAURANT,
  ROUTE_DASHBOARD_USER,
} from '../../constants/routes';
import Spinner from '../layout/Spinner';

const AdminRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, user },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      loading ? (
        <Spinner />
      ) : !isAuthenticated ? (
        <Redirect to={ROUTE_LOGIN} />
      ) : user.is_admin ? (
        <Component {...props} />
      ) : user.is_staff ? (
        <Redirect to={ROUTE_DASHBOARD_RESTAURANT} />
      ) : (
        <Redirect to={ROUTE_DASHBOARD_USER} />
      )
    }
  />
);

AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AdminRoute);
