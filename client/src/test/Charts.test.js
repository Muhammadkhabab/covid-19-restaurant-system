import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { getRestaurantData } from '../actions/restaurant';
import Charts from '../components/charts/Charts';




const mockStore = configureStore([]);

const chartStore = mockStore({
rid: "608633a674e2d24b57226f36",
getRestaurantData,
restaurant: { 
    restaurant: {
      address: "1234 State St.",
      avatar: "https://cdn3.vectorstock.com/i/1000x1000/73/07/cooking-and-restaurant-logo-design-vector-29707307.jpg",
      cuisine: "American",
      curbside_pickup: false,
      current_customers: 12,
      current_employees: 6,
      current_free_tables: 7,
      current_percent_capacity: 0.45,
      customer_capacity: 30,
      customer_per_table: 2,
      delivery: true,
      dine_in: true,
      dine_outside: false,
      employee_capacity: 10,
      number_tables: 15,
      pickup: true,
      policy_notes: "Food Planet aims to bring a safe and eco-friendly experience to the customers. To protect yourself and others, please wear mask when coming into the store ,and   ordering food. Limit touching unnecessary surface to avoid exposure to potential COVID-19 virus. Keep decent distance from other customers. We hope you have a ,wonderful  experiene here at Food Planet.",
      restaurant_email: "food.planet@gmail.com",
      restaurant_name: "Food Planet",
      restaurant_phone_number: "908-187-2626",
      reviewed: false,
      square_footage: 450,
      tables_distance: 5,
      website_url: "https://foodandplanet.org/",
      __v: 0,
      _id: "608633a674e2d24b57226f36",
    }},

});

test('renders without crashing', () => {
    render(<Provider store={chartStore}><Charts /></Provider>,{wrapper: MemoryRouter});
  });
