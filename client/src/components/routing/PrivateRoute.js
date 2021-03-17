import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ROUTE_LOGIN } from '../../constants/routes';
import Spinner from '../layout/Spinner';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      // loading ? (
      //   <Spinner />
      // ) : !isAuthenticated ? (
      //   <Redirect to={ROUTE_LOGIN} />
      // ) : (
      //   <Component {...props} />
      // )
      !isAuthenticated && !loading ? (
        <Redirect to={ROUTE_LOGIN} />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
