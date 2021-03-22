import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../layout/Spinner';
import RestaurantRow from './RestaurantRow';

const API = 'api/v1';

const Restaurants = () => {

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`/${API}/restaurants`).then((res) => {
      setItems(res.data.restaurants);
      console.log(res.data);
      setIsLoaded(true);
    }).catch((err) => {
      console.log(err)
      setIsLoaded(true);
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => {
          toast.error(error.msg);
          toast.error(error.param);
          console.log(error);
        });
      }
    });
  }, []);

  const buildTable = (items) => {
    return items.map((item) => {
      return <RestaurantRow restObj={item} />
    });
  };

  return isLoaded ? (
    <div>
      {buildTable(items)}
    </div>
  ) : (
    <Spinner />
  );
};

export default Restaurants;
