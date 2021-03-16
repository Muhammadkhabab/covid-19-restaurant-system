// React
import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

// Authentication components
import RegisterRestaurant from '../auth/RegisterRestaurant';
import RegisterCustomer from '../auth/RegisterCustomer';
import Login from '../auth/Login';

// Restaurant Interface Components
import DashboardRestaurant from '../dashboard/DashboardRestaurant';
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

// Reactstrap Components
import { Container } from 'reactstrap';

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
} from '../../constants/routes';

function Routes() {
  return (
    <Fragment>
      <NavigationBar />
      <Container className='my-4'>
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

          {/* Public application routes */}
          <Route exact path={ROUTE_RESTAURANTS} component={Restaurants} />
          <Route exact path={ROUTE_RESTAURANT_PROFILE} component={Restaurant} />

          {/* Authenticated routes */}
          <PrivateRoute
            exact
            path={ROUTE_DASHBOARD_USER}
            component={DashboardCustomer}
          />

          {/* Admin/staff routes */}
          <RestaurantRoute
            exact
            path={ROUTE_DASHBOARD_RESTAURANT}
            component={DashboardRestaurant}
          />

          {/* Admin routes */}
          <AdminRoute
            exact
            path={ROUTE_EDIT_RESTAURANT}
            component={EditRestaurant}
          />

          <Route component={NotFound} />
        </Switch>
      </Container>
    </Fragment>
  );
}

export default Routes;
