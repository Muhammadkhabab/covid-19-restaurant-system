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
  min_table_distance: {
    type: Number,
  },
  cuisine: {
    type: String,
  },
  dine_in: {
    type: Boolean,
  },
  dine_out: {
    type: Boolean,
  },
  pickup: {
    type: Boolean,
  },
  curbside: {
    type: Boolean,
  },
  delivery: {
    type: Boolean,
  },
  max_employess: {
    type: Number,
  },
  max_customers: {
    type: Number,
  },
  min_tables: {
    type: Number,
    default: 1000,
  },
});

module.exports = Notification = mongoose.model(
  'notification',
  NotificationSchema
);
