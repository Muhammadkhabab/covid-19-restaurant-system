const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  is_contact_email: {
    type: Boolean,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  location_lat: {
    type: Number,
    // required: true,
  },
  location_long: {
    type: Number,
    // required: true,
  },
  start_time: {
    type: Date,
    required: true,
  },
  end_time: {
    type: Date,
    required: true,
  },
  interval: {
    type: Number,
    default: 15,
  },
  max_distance: {
    type: Number,
    // required: true,
  },
  min_table_distance: {
    type: Number,
  },
  cuisine: {
    type: String,
  },
  dine_in: {
    type: Boolean,
  },
  dine_outside: {
    type: Boolean,
  },
  pickup: {
    type: Boolean,
  },
  curbside_pickup: {
    type: Boolean,
  },
  delivery: {
    type: Boolean,
  },
  max_employees: {
    type: Number,
  },
  max_customers: {
    type: Number,
  },
  min_tables: {
    type: Number,
  },
  percent_capacity: {
    type: Number,
  },
});

module.exports = Notification = mongoose.model(
  'notification',
  NotificationSchema
);
