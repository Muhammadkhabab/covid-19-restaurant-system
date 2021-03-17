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
      is_text,
      is_email,
      lat,
      long,
      date_requested,
      start_time,
      end_time,
      max_distance,
      cuisine,
      dine_in,
      dine_out,
      pickup,
      curbside,
      delivery,
      max_empl,
      max_cust,
      max_cust_per_table,
      min_table_distance
    } = req.body;

    try {
      const user = await User.findById(req.user.id);
      const errors = [];

      if (!is_text && !is_email) {
        errors.push({ msg: 'Sign up for either text or email notifications!' });
      }
      if (start_time >= end_time) {
        errors.push({ msg: 'Enter an end time later than the start time!' });
      }
      if (start_time > 24) {
        errors.push({ msg: 'Enter a start time from 0-24!' });
      }
      if (end_time > 24) {
        errors.push({ msg: 'Enter an end time from 0-24!' });
      }
      if (!dine_in && !dine_out && !pickup && !curbside && !delivery) {
        errors.push({ msg: 'Enter at least one option for dining experience!' });
      }
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      // Create new notification.
      const notification = new Notification({
        user,
        is_text,
        is_email,
        lat,
        long,
        date_requested,
        start_time,
        end_time,
        max_distance,
        cuisine,
        dine_in,
        dine_out,
        pickup,
        curbside,
        delivery,
        max_empl,
        max_cust,
        max_cust_per_table,
        min_table_distance
      });

      await notification.save();
      return res.status(200).json({ msg: 'Signed up for notification successfully!' });

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
      const notifications = await Notification.find({ user: user })
      return res.status(200).json(notifications);

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
      const notification = await Notification.findById(req.params.nid);
      if (notification.user.id != req.user.id) {
        errors.push({ msg: 'User not authorized to delete this notification!' });
      }
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      await Notification.findByIdAndDelete(req.params.nid);

      return res.status(200).json({ msg: 'Notification deleted successfully!' });
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
