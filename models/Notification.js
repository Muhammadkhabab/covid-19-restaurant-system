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
  lat: {
    type: Number,
    // required: true,
  },
  long: {
    type: Number,
    // required: true,
  },
  start_date_requested: {
    type: Date,
    required: true,
  },
  end_date_requested: {
    type: Date,
    required: true,
  },
  max_distance: {
    type: Number,
    default: 1000,
  },
  cuisine: {
    type: String,
    default: 'All',
  },
  dine_in: {
    type: Boolean,
    default: false,
  },
  dine_out: {
    type: Boolean,
    default: false,
  },
  pickup: {
    type: Boolean,
    default: false,
  },
  curbside: {
    type: Boolean,
    default: false,
  },
  delivery: {
    type: Boolean,
    default: false,
  },
  max_empl: {
    type: Number,
    default: 1000,
  },
  max_cust: {
    type: Number,
    default: 1000,
  },
  max_cust_per_table: {
    type: Number,
    default: 1000,
  },
  min_table_distance: {
    type: Number,
    default: 0,
  },
});

module.exports = Notification = mongoose.model(
  'notification',
  NotificationSchema
);
