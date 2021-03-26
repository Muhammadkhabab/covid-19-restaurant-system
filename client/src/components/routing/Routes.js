// React
import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

// Authentication components
import RegisterRestaurant from '../auth/RegisterRestaurant';
import RegisterCustomer from '../auth/RegisterCustomer';
import Login from '../auth/Login';

// Account component
import Account from '../account/Account';

// Restaurant Interface Components
import RestaurantDashboard from '../dashboard/RestaurantDashboard';
import DashboardCustomer from '../dashboard/DashboardCustomer';

// Customer Interface Components
import Restaurants from '../restaurants/Restaurants';
import Restaurant from '../restaurants/Restaurant';
import EditRestaurant from '../restaurants/EditRestaurant';

// Page components - Entire application
import NotFound from '../pages/NotFound';

// Layout components - Entire application
import NavigationBar from '../layout/NavigationBar';

// Routing components
import PrivateRoute from '../routing/PrivateRoute';
import AdminRoute from '../routing/AdminRoute';
import RestaurantRoute from '../routing/RestaurantRoute';

// Route constants
import {
  ROUTE_LOGIN,
  ROUTE_REGISTER_CUSTOMER,
  ROUTE_REGISTER_RESTAURANT,
  ROUTE_RESTAURANTS,
  ROUTE_RESTAURANT_PROFILE,
  ROUTE_EDIT_RESTAURANT,
  ROUTE_DASHBOARD_RESTAURANT,
  ROUTE_DASHBOARD_USER,
  ROUTE_ACCOUNT,
} from '../../constants/routes';

function Routes() {
  return (
    <Fragment>
      <NavigationBar />
      <Switch>
        {/* Public authentication routes */}
        <Route
          exact
          path={ROUTE_REGISTER_RESTAURANT}
          component={RegisterRestaurant}
        />
        <Route
          exact
          path={ROUTE_REGISTER_CUSTOMER}
          component={RegisterCustomer}
        />
        <Route exact path={ROUTE_LOGIN} component={Login} />

        {/* Authenticated routes */}
        <PrivateRoute
          exact
          path={ROUTE_DASHBOARD_USER}
          component={DashboardCustomer}
        />

        <PrivateRoute exact path={ROUTE_ACCOUNT} component={Account} />

        {/* Admin/staff routes */}
        <PrivateRoute
          exact
          path={ROUTE_DASHBOARD_RESTAURANT}
          component={RestaurantDashboard}
        />

        {/* Admin routes */}
        <PrivateRoute
          exact
          path={ROUTE_EDIT_RESTAURANT}
          component={EditRestaurant}
        />

        {/* Public application routes */}
        <Route exact path={ROUTE_RESTAURANTS} component={Restaurants} />
        <Route exact path={ROUTE_RESTAURANT_PROFILE} component={Restaurant} />

        <Route component={NotFound} />
      </Switch>
    </Fragment>
  );
}

export default Routes;
