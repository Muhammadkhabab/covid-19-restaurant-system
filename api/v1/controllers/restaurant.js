// Validation.
const { validationResult } = require('express-validator');

// Authentication.
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Link User model.
const User = require('../../../models/User');

// Link Restaurant model
const Restaurant = require('../../../models/Restaurant');

// Link Record model
const Record = require('../../../models/Record');

module.exports = {
  create: async (req, res, _next) => {
    // Check for errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      first_name,
      last_name,
      username,
      email,
      phone_number,
      birth_date,
      password,
      confirmed_password,

      restaurant_name,
      address,
      restaurant_email,
      restaurant_phone_number,
      website_url,
      dine_in,
      dine_outside,
      pickup,
      curbside_pickup,
      delivery,
      policy_notes,
      employee_capacity,
      customer_capacity,
      number_tables,
      square_footage,
      customer_per_table,
      tables_distance,
    } = res.body;

    try {
      // Check if user exists (check if email or username exists).
      const sameEmail = await User.findOne({ email });
      const errors = [];
      if (sameEmail) {
        errors.push({
          msg: 'Email was already taken. Please enter another email!',
        });
      }
      const sameUsername = await User.findOne({ username });
      if (sameUsername) {
        errors.push({
          msg: 'Username was already taken. Please enter another username!',
        });
      }
      if (password !== confirmed_password) {
        errors.push({
          msg: 'Passwords do not match!',
        });
      }

      // Create new user.
      const user = new User({
        first_name,
        last_name,
        username,
        email,
        password,
        phone_number,
        birth_date,
      });

      user.is_admin = true;

      // Encrypt password.
      const salt = await bcrypt.genSalt(15);
      user.password = await bcrypt.hash(password, salt);

      // Return jsonwebtoken.
      const payload = {
        user: {
          id: user.id,
        },
      };

      let token;

      jwt.sign(
        payload,
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: 86400 },
        (err, resultToken) => {
          if (err) throw err;
          token = resultToken;
        }
      );

      const sameNameAddress = await Restaurant.findOne({
        restaurant_name,
        address,
      });
      if (sameNameAddress) {
        errors.push({
          msg:
            'There exists a restaurant with the same name at this address. Please enter another name or address.',
        });
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const restaurant = new Restaurant({
        restaurant_name,
        address,
        restaurant_email,
        restaurant_phone_number,
        employee_capacity,
        customer_capacity,
        number_tables,
      });

      if (website_url) restaurant.website_url = website_url;
      if (policy_notes) restaurant.policy_notes = policy_notes;
      if (square_footage) restaurant.square_footage = square_footage;
      if (customer_per_table)
        restaurant.customer_per_table = customer_per_table;
      if (tables_distance) restaurant.tables_distance = tables_distance;
      restaurant.dine_in = dine_in == 1;
      restaurant.dine_outside = dine_outside == 1;
      restaurant.pickup = pickup == 1;
      restaurant.curbside_pickup = curbside_pickup == 1;
      restaurant.delivery = delivery == 1;

      await restaurant.save();
      user.restaurant_id = restaurant._id;

      await user.save();
      return res.status(200).json({ token, restaurant });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        errors: [
          { msg: 'Unexpected server error happened. Please try again later!' },
        ],
      });
    }
  },

  update: async (req, res, _next) => {
    // Check for errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
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
    // Check for errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id);
      const restaurant_id = user.restaurant_id;
      await Restaurant.findByIdAndDelete(restaurant_id);

      return res.status(200).json({ msg: 'Restaurant deleted successfully!' });
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
