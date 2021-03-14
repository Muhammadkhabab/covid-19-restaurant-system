// React
import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from '../routing/PrivateRoute';
// Authentication components
import RegisterRestaurant from '../auth/RegisterRestaurant';
import RegisterCustomer from '../auth/RegisterCustomer';
import Login from '../auth/Login';

// Restaurant Interface Components
import Dashboard from '../dashboard/Dashboard';

// Customer Interface Components
import Restaurants from '../restaurants/Restaurants';
import Restaurant from '../restaurants/Restaurant';
import AdvancedSearch from '../restaurants/AdvancedSearch';

// Page components - Entire application
import NotFound from '../pages/NotFound';

// Layout components - Entire application
import NavigationBar from '../layout/NavigationBar';

// Reactstrap Components
import { Container } from 'reactstrap';

function Routes () {
    return (
    <Fragment>
      <NavigationBar />
      <Container className='my-5'>
        <Switch>
          <Route exact path='/register/restaurant' component={RegisterRestaurant} />
          <Route exact path='/register/customer' component={RegisterCustomer} />
          <Route exact path='/login' component={Login} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <Route exact path='/restaurants' component={Restaurants} />
          <Route exact path='/restaurant/:restaurant_id' component={Restaurant} />
          <Route exact path='/advancedsearch' component={AdvancedSearch} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </Fragment>
    );
};

export default Routes;