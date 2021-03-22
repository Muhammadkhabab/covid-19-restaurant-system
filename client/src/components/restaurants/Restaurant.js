import React, { useEffect } from 'react';
import RestaurantProfile from './RestaurantProfile';

const Restaurant = ({ match, restaurant }) => {
  useEffect(() => {
    // getRestaurant(match.params.login);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <RestaurantProfile restObj={restaurant} />
    </div>
  );
};

export default Restaurant;
