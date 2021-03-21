import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import PolicyBadges from './PolicyBadges.js'
import '../../styles/RestaurantTable.scss';

/* Dis */
const RestaurantRow = ({
  restObj: {
    restaurant_name,
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
  },
}) => {
  const policies = { dine_in, dine_outside, pickup, curbside_pickup, delivery }
  return (
    <div className='restaurant-row'>
      <Container>
        <Row>
          <Col md="2">
            <div className='logo-wrapper'>
              <img
                src='https://images.squarespace-cdn.com/content/v1/578d4c7a8419c227c750b539/1572971173664-VMLWSYNF0B1T0WT99MT5/ke17ZwdGBToddI8pDm48kDldiTmRHKJ5v0YqxgeTKYoUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcILJf9YR3LP5aM5G6UY-AAu_ngb_bs84XNd2m-CICIhr-FNO5NkILC6XZG9VcRQgL/Milk+Tea_smaller+v2.jpg'
                alt='Restaurant logo'
              />
            </div>
          </Col>
          <Col md="10">
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
            <Row>
              <Col>
                <div className='address'>
                  <p>{address}</p>
                </div>
              </Col>
              <Col><p>Current Capacity: 4/12</p></Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RestaurantRow;
