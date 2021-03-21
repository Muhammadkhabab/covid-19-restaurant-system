import React from 'react';
import { Badge } from 'reactstrap'
import '../../styles/Restaurants.scss';

const PolicyBadges = ({
  dine_in,
  dine_outside,
  pickup,
  curbside_pickup,
  delivery
}) => {
  return (
    <div className='badges'>
      {dine_in ? (
        <Badge color='light'>
          Dine in <i className='fas fa-check-square'></i>
        </Badge>
      ) : (
        <Badge color='light'>
          Dine in <i className='fas fa-times-circle'></i>
        </Badge>
      )}
      {dine_outside ? (
        <Badge color='light'>
          Dine outside <i className='fas fa-check-square'></i>
        </Badge>
      ) : (
        <Badge color='light'>
          Dine outside <i className='fas fa-times-circle'></i>
        </Badge>
      )}
      {pickup ? (
        <Badge color='light'>
          Pickup <i className='fas fa-check-square'></i>
        </Badge>
      ) : (
        <Badge color='light'>
          Pickup <i className='fas fa-times-circle'></i>
        </Badge>
      )}
      {curbside_pickup ? (
        <Badge color='light'>
          Curbside pickup <i className='fas fa-check-square'></i>
        </Badge>
      ) : (
        <Badge color='light'>
          Curbside pickup <i className='fas fa-times-circle'></i>
        </Badge>
      )}
      {delivery ? (
        <Badge color='light'>
          Delivery <i className='fas fa-check-square'></i>
        </Badge>
      ) : (
        <Badge color='light'>
          Delivery <i className='fas fa-times-circle'></i>
        </Badge>
      )}
    </div>
  );
};

export default PolicyBadges;
