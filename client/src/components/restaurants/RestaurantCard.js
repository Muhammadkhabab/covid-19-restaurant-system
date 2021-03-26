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
            <p>
              Current Capacity: {current_customers ? current_customers : '?'}/
              {customer_capacity}
            </p>
          </Col>
        </Row>
      </Link>
    </div>
  );
};

export default RestaurantRow;
