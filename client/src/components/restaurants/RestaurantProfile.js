import React from 'react';
import { Jumbotron, Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../styles/Restaurants.scss';
import { ROUTE_EDIT_RESTAURANT } from '../../constants/routes';
import Charts from '../charts/Charts';
import PolicyBadges from '../layout/PolicyBadges';
import Avatar from '../layout/Avatar';
import { toast } from 'react-toastify';
import RestaurantMap from './RestaurantMap';

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

    number_tables,
    customer_per_table,
    tables_distance,
    square_footage,
    cuisine,
    website_url,
    _id,
  },
  user,
  update,
}) => {
  const policies = { dine_in, dine_outside, pickup, curbside_pickup, delivery };

  const onClick = (i, val) => {
    if (user && user.is_admin && user.restaurant_id === _id) {
      const prompts = ['employees', 'customers', 'free tables'];
      const ans = window.prompt(`Current number of ${prompts[i]}`, val);
      if (isNaN(ans) || parseInt(ans) < 0) {
        toast.error('Value must be a non-negative integer');
        return;
      }
      if (ans === null) {
        return;
      }
      const dataObj = {};
      dataObj['current_customers'] = current_customers ? current_customers : 0;
      dataObj['current_employees'] = current_employees ? current_employees : 0;
      dataObj['current_free_tables'] = current_free_tables
        ? current_free_tables
        : 0;

      const fields = [
        'current_employees',
        'current_customers',
        'current_free_tables',
      ];
      dataObj[fields[i]] = parseInt(ans);
      update(dataObj);
    }
  };

  return (
    <div id='restaurant-profile'>
      <Jumbotron>
        <Container className='my-4'>
          <Row className='header-wrapper'>
            <Col xs='12' lg='3'>
              <Avatar avatar={avatar} />
              <a
                target='_blank'
                rel='noreferrer'
                href={website_url}
                className='external-link btn btn-outline-primary'
              >
                Restaurant website
              </a>
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
                {cuisine && <p className='m-0 info-text'>Cuisine: {cuisine}</p>}
                <p className='m-0 info-text'>Address: {address}</p>

                <PolicyBadges policies={policies} />
                <Row className='mt-3'>
                  <Col lg='2'>
                    <p className='mb-1'># of employees</p>
                    <div
                      className='stat-box'
                      onClick={() => onClick(0, current_employees)}
                    >
                      {current_employees ? current_employees : 0}
                    </div>
                  </Col>
                  <Col lg='2'>
                    <p className='mb-1'># of customers</p>
                    <div
                      className='stat-box'
                      onClick={() => onClick(1, current_customers)}
                    >
                      {current_customers ? current_customers : 0}
                    </div>
                  </Col>
                  <Col lg='2'>
                    <p className='mb-1'># of free tables</p>
                    <div
                      className='stat-box'
                      onClick={() => onClick(2, current_free_tables)}
                    >
                      {current_free_tables ? current_free_tables : 0}
                    </div>
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
            <div className='map-wrapper'>
              <RestaurantMap addr={address} restName={restaurant_name}/>
            </div>
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
              <p>Table capacity: {number_tables}</p>
            </div>
            <div className='msg-text mt-5'>
              <h1>Additional information</h1>
              <p>Customers allowed per table: {customer_per_table}</p>
              <p>Distance between tables: {tables_distance}</p>
              <p>Dining area: {square_footage}</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RestaurantProfile;
