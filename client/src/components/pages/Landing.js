import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../../styles/Landing.scss';
import {
  ROUTE_LOGIN,
  ROUTE_REGISTER_CUSTOMER,
  ROUTE_REGISTER_RESTAURANT,
  ROUTE_RESTAURANTS,
  ROUTE_DASHBOARD_USER,
} from '../../constants/routes';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to={ROUTE_DASHBOARD_USER} />;
  }

  return (
    <div id='landing-page'>
      <div className='overlay'>
        <div className='btn-side-group'>
          <div>
            <Link to={ROUTE_LOGIN} className='btn btn-danger'>
              Login
            </Link>
          </div>
          <div>
            <Link to={ROUTE_REGISTER_RESTAURANT} className='btn btn-primary'>
              Register Restaurant
            </Link>
          </div>
          <div>
            <Link to={ROUTE_REGISTER_CUSTOMER} className='btn btn-success'>
              Register Customer
            </Link>
          </div>
        </div>
        <div className='content'>
          <h1>Safe Dining</h1>
          <p>
            <i>
              Find up-to-date information about Covid-19 protocols and
              procedures at participating restaurants in Madison, Wisconsin.
            </i>
          </p>
          <div>
            <Link
              to={ROUTE_RESTAURANTS}
              className='btn btn-outline-light mr-2'
              id='restaurant-info'
            >
              View Restaurant Information
            </Link>
          </div>
          {/* <div>
            <Link
              to={ROUTE_REGISTER_RESTAURANT}
              className='btn btn-outline-warning mr-2'
            >
              Register Restaurant
            </Link>
            <Link
              to={ROUTE_REGISTER_CUSTOMER}
              className='btn btn-outline-warning ml-2'
            >
              Register Customer
            </Link>
          </div>
          <div>
            <Link to={ROUTE_LOGIN} className='btn btn-outline-light mr-2'>
              Login
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Landing;
