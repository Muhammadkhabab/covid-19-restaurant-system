// Validation.
const { validationResult } = require('express-validator');

// Link Notification model
const Notification = require('../../../models/Notification');

module.exports = {
  subscribe: async (req, res, _next) => {
    // Check for errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring data from request body.
    const {
      is_contact_email,
      contact,
      location_lat,
      location_long,
      start_time,
      end_time,
      interval,
      max_distance,
      min_table_distance,
      cuisine,
      dine_in,
      dine_outside,
      pickup,
      curbside,
      delivery,
      max_employees,
      max_customers,
      min_tables,
      percent_capacity,
    } = req.body;

    try {
      const errors = [];

      const start_datetime = new Date(start_time);
      const end_datetime = new Date(end_time);

      if (start_datetime <= new Date()) {
        errors.push({ msg: 'Start time cannot be in the past!' });
      }
      if (start_datetime >= end_datetime) {
        errors.push({ msg: 'End time must be later than start time!' });
      }

      if (!dine_in && !dine_outside && !pickup && !curbside && !delivery) {
        errors.push({
          msg: 'Enter at least one option for dining experience!',
        });
      }
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      // Create new notification.
      const notification = new Notification({
        is_contact_email,
        contact,
        location_lat,
        location_long,
        start_time,
        end_time,
        interval,
        max_distance,
        min_table_distance,
        cuisine,
        dine_in,
        dine_outside,
        pickup,
        curbside,
        delivery,
        max_employees,
        max_customers,
        min_tables,
        percent_capacity,
      });

      await notification.save();
      return res
        .status(200)
        .json({ msg: 'Signed up for notification successfully!' });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        errors: [
          { msg: 'Unexpected server error happened. Please try again later!' },
        ],
      });
    }
  },

  get: async (req, res, _next) => {
    try {
      const user = await User.findById(req.user.id);
      const email_notifications = await Notification.find({
        contact: user.email,
      });
      const phone_notifications = await Notification.find({
        contact: user.phone_number,
      });
      return res
        .status(200)
        .json(email_notifications.concat(phone_notifications));
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        errors: [
          { msg: 'Unexpected server error happened. Please try again later!' },
        ],
      });
    }
  },

  delete: async (req, res, _next) => {
    try {
      const errors = [];

      const user = await User.findById(req.user.id);
      const notification = await Notification.findById(req.params.nid);
      if (
        notification.contact != user.phone_number &&
        notification.contact != user.email
      ) {
        errors.push({
          msg: 'User not authorized to delete this notification!',
        });
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      await Notification.findByIdAndDelete(req.params.nid);

      return res
        .status(200)
        .json({ msg: 'Notification deleted successfully!' });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        errors: [
          { msg: 'Unexpected server error happened. Please try again later!' },
        ],
      });
    }
  },
};
