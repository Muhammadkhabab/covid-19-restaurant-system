import React from 'react';
import RestaurantRow from './RestaurantRow';

/* Dis */
const Restaurants = () => {
  return (
    <RestaurantRow restObj={{
      restaurant_name: "Kungfu Tea",
      address: "Sample Address",
      dine_in: true,
      dine_outside: false,
      pickup: true,
      curbside_pickup: false,
      delivery: true,
    }} />
  );
};

export default Restaurants;
