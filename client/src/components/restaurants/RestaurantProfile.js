import React from 'react';
import { Jumbotron, Container, Badge, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../styles/Restaurants.scss';
import { ROUTE_EDIT_RESTAURANT } from '../../constants/routes';
import Charts from '../charts/Charts';
import PolicyBadges from '../layout/PolicyBadges';
import Avatar from '../layout/Avatar';

const RestaurantProfile = ({
  restObj: {
    restaurant_name,
    avatar,
    address,
    dine_in,
    dine_outside,
    pickup,
    curbside_pickup,
    delivery,
    policy_notes,
    employee_capacity,
    customer_capacity,
    restaurant_email,
    restaurant_phone_number,
    current_customers,
    current_employees,
    current_free_tables,
    _id,
  },
  user,
}) => {
  const policies = { dine_in, dine_outside, pickup, curbside_pickup, delivery };
  return (
    <div id='restaurant-profile'>
      <Jumbotron>
        <Container className='my-4'>
          <Row className='header-wrapper'>
            <Col xs='12' lg='3'>
              <Avatar avatar={avatar} />
            </Col>
            <Col xs='12' lg='9'>
              <div className='basic-info'>
                <h1 className='header'>
                  {restaurant_name}
                  {user && user.is_admin && user.restaurant_id === _id && (
                    <Link to={ROUTE_EDIT_RESTAURANT}>
                      <i className='ml-5 fas fa-edit'></i>
                    </Link>
                  )}
                </h1>
                <p className='info-text'>{address}</p>
                <PolicyBadges policies={policies} />
                <Row className='mt-3'>
                  <Col lg='2'>
                    <p className='mb-1'># of employees</p>
                    <div className='stat-box'>{current_employees}</div>
                  </Col>
                  <Col lg='2'>
                    <p className='mb-1'># of customers</p>
                    <div className='stat-box'>{current_customers}</div>
                  </Col>
                  <Col lg='2'>
                    <p className='mb-1'># of free tables</p>
                    <div className='stat-box'>{current_free_tables}</div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
      <Row>
        <Col xs='12' lg='4'>
          <div className='left-panel'>
            <div className='contact-info'>
              <div className='msg-text'>
                <h1>Contact</h1>
                <p>Email: {restaurant_email}</p>
                <p>Tel: {restaurant_phone_number}</p>
              </div>
            </div>
            <div className='map-wrapper'></div>
          </div>
        </Col>
        <Col xs='12' lg='4'>
          <div className='middle-panel'>
            <div className='msg-text mb-4'>
              <h1>Data</h1>
              <p>Visualization of restaurant data over the past 7 days</p>
            </div>
            <Charts rid={_id} />
          </div>
        </Col>
        <Col xs='12' lg='4'>
          <div className='right-panel'>
            <div className='msg-text'>
              <h1>Policy</h1>
              <p>{policy_notes}</p>
            </div>
            <div className='msg-text mt-5'>
              <h1>Capacity</h1>
              <p>Employee capacity: {employee_capacity}</p>
              <p>Customer capacity: {customer_capacity}</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RestaurantProfile;
