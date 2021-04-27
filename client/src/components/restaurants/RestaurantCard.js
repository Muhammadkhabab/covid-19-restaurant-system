import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import PolicyBadges from '../layout/PolicyBadges.js';
import Avatar from '../layout/Avatar';
import '../../styles/RestaurantCard.scss';

/* Single row in the restaurant table with basic restaurant information */
const RestaurantRow = ({
  restObj: {
    restaurant_name,
    address,
    dine_in,
    dine_outside,
    pickup,
    curbside_pickup,
    delivery,
    avatar,
    current_customers,
    customer_capacity,
    current_employees,
    employee_capacity,
    number_tables,
    current_free_tables,
    _id: id,
  },
}) => {
  const policies = { dine_in, dine_outside, pickup, curbside_pickup, delivery };
  return (
    <div className='restaurant-card'>
      <Link to={`/restaurants/${id}`}>
        <Row>
          <Col md='2'>
            <Avatar avatar={avatar} />
          </Col>
          <Col md='5'>
            <h1 className='m-0'>{restaurant_name}</h1>
            <p>{address}</p>
          </Col>
          <Col md='5'>
            <PolicyBadges policies={policies} />
            <p className='mt-2 m-0'>
              Current capacity:{' '}
              {current_customers && current_employees
                ? current_customers + current_employees
                : '?'}
              /{customer_capacity + employee_capacity}
              {current_customers &&
                current_employees &&
                ` (${(
                  ((current_customers + current_employees) /
                    (customer_capacity + employee_capacity)) *
                  100
                ).toFixed(0)}%)`}
            </p>
            <p>
              Current free tables:{' '}
              {current_free_tables ? current_free_tables : '?'}/{number_tables}
            </p>
          </Col>
        </Row>
      </Link>
    </div>
  );
};

export default RestaurantRow;
