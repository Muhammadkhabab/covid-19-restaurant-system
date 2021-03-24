import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import PolicyBadges from './PolicyBadges.js'
import Placeholder from '../../assets/images/res_placeholder.png';
import '../../styles/RestaurantTable.scss';

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
  const policies = { dine_in, dine_outside, pickup, curbside_pickup, delivery }
  return (

    <div className='restaurant-row'>
      <Link to={`/restaurants/${id}`}>
        <Container>
          <Row>
            <Col md="2">
              <div className='logo-wrapper'>
                <img
                  src={avatar ? avatar : Placeholder}
                  alt='Restaurant logo'
                />
              </div>
            </Col>
            <Col md="10">
              <div className='top-row'>
                <Row>
                  <Col>
                    <div className='restaurant-name'>
                      <h1>{restaurant_name}</h1>
                    </div>
                  </Col>
                  <Col>
                    <PolicyBadges {...policies} />
                  </Col>
                </Row>
              </div>
              <div className='bottom-row'>
                <Row>
                  <Col>
                    <div className='address'>
                      <p>{address}</p>
                    </div>
                  </Col>
                  <Col>
                    <p>Current Capacity:
                      {current_customers ? current_customers : '?'}/{customer_capacity}
                    </p>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </Link>
    </div>
  );
};

export default RestaurantRow;
