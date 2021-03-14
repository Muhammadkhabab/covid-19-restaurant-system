const mongoose = require('mongoose');
const RestaurantSchema = new mongoose.Schema({
  restaurant_name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  website_url: {
    type: String,
  },
  restaurant_email: {
    type: String,
    required: true,
  },
  restaurant_phone_number: {
    type: String,
    required: true,
  },
  cuisine: [String],
  dine_in: {
    type: Boolean,
    required: true,
  },
  dine_outside: {
    type: Boolean,
    required: true,
  },
  pickup: {
    type: Boolean,
    required: true,
  },
  curbside_pickup: {
    type: Boolean,
    required: true,
  },
  delivery: {
    type: Boolean,
    required: true,
  },
  employee_capacity: {
    type: Number,
    required: true,
  },
  customer_capacity: {
    type: Number,
    required: true,
  },
  policy_notes: {
    type: String,
  },
  number_tables: {
    type: Number,
    required: true,
  },
  square_footage: {
    type: Number,
  },
  customer_per_table: {
    type: Number,
  },
  tables_distance: {
    type: Number,
  },
  current_customers: {
    type: Number,
  },
  current_employees: {
    type: Number,
  },
  current_free_tables: {
    type: Number,
  },
  reviewed: {
    type: Boolean,
    default: false,
  },
});

module.exports = Restaurant = mongoose.model('restaurant', RestaurantSchema);
