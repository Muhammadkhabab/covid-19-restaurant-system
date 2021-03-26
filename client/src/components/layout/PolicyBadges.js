import React from 'react';
import { Badge } from 'reactstrap';

const PolicyBadges = ({
  policies: { dine_in, dine_outside, pickup, curbside_pickup, delivery },
}) => {
  const booleanVals = [
    {
      val: dine_in,
      str: 'Dine in',
    },
    {
      val: dine_outside,
      str: 'Dine outside',
    },
    {
      val: pickup,
      str: 'Pickup',
    },
    {
      val: curbside_pickup,
      str: 'Curbside pickup',
    },
    {
      val: delivery,
      str: 'Delivery',
    },
  ];
  return (
    <div className='badges'>
      {booleanVals.map((v, k) =>
        v.val ? (
          <Badge color='light' key={k}>
            {v.str} <i className='fas fa-check-square'></i>
          </Badge>
        ) : (
          <Badge color='light' key={k}>
            {v.str} <i className='fas fa-times-circle'></i>
          </Badge>
        )
      )}
    </div>
  );
};

export default PolicyBadges;
