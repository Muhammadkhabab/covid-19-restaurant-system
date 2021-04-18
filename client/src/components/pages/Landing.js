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
import Eating from '../svg/Eating'
import {Container,Row} from 'reactstrap'

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to={ROUTE_DASHBOARD_USER} />;
  }

  return (
    <div id='landing-page'>
      <div className='overlay'>

        <Container>
          <Row className="d-flex justify-content-end">
          <div className='btn-side-group mt-3'>
          <div>
            <Link to={ROUTE_LOGIN} className='btn btn-danger'>
              Login
            </Link>
          </div>
          <div>
            <Link to={ROUTE_REGISTER_CUSTOMER} className='btn btn-success'>
              Register Customer
            </Link>
          </div>
          <div>
            <Link to={ROUTE_REGISTER_RESTAURANT} className='btn btn-primary '>
              Register Restaurant
            </Link>
          </div>
          
        </div>
          </Row>
          <Row className="d-flex justify-content-center"><Eating className="w-50 h-50"/></Row>
        </Container>
        <div className='content w-100 pb-4'>
          <h1>Safe Dining</h1>
          <p className="fw-bold fst-italic">
            Find up-to-date information about Covid-19 protocols and
            procedures at participating restaurants in Madison, Wisconsin.
          </p>
          <div className="d-flex justify-content-center">
            <Link
              to={ROUTE_RESTAURANTS}
              className='btn btn-outline-light w-25'
              id='restaurant-info'
            >
              View Restaurant Information
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Landing;
