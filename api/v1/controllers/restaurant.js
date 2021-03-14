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
    } = req.body;

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

    const {
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
    } = req.body;

    try {
      const errors = [];

      const user = await User.findById(req.user.id);
      if (!user.is_admin || !user.restaurant_id) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Restaurant not found!' }] });
      }
      const restaurant = await Restaurant.findById(user.restaurant_id);

      if (
        restaurant.restaurant_name != restaurant_name ||
        restaurant.address != address
      ) {
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
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      restaurant.restaurant_name = restaurant_name;
      restaurant.restaurant_email = restaurant_email;
      restaurant.restaurant_phone_number = restaurant_phone_number;
      restaurant.address = address;
      restaurant.employee_capacity = employee_capacity;
      restaurant.customer_capacity = customer_capacity;
      restaurant.number_tables = number_tables;

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
      return res.status(200).json(restaurant);
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
      const user = await User.findById(req.user.id);
      if (!user.is_admin || !user.restaurant_id) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Restaurant not found!' }] });
      }
      await Restaurant.findByIdAndDelete(user.restaurant_id);

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

  getAll: async (req, res, _next) => {
    try {
      // Return all restaurants
      const restaurants = await Restaurant.find();
      const num_restaurants = Object.keys(restaurants).length;

      const response = { num_restaurants, restaurants };

      return res.status(200).json(response);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        errors: [
          { msg: 'Unexpected server error happened. Please try again later!' },
        ],
      });
    }
  },

  getMy: async (req, res, _next) => {
    try {
      //Check if user exists
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ errors: [{ msg: 'User not found!' }] });
      }

      //Check if the user has a restaurant
      const restaurantId = user.restaurant_id;
      //If restaurant does not exist for the user, prints error
      if (!restaurantId) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Restaurant does not exist!' }] });
      }

      if (!user.is_admin && !user.is_staff) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'User is not authorized!' }] });
      }
      //If exists, respond with the restaurant information
      else {
        const myRestaurant = await Restaurant.findById(restaurantId);
        return res.status(200).json(myRestaurant);
      }
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        errors: [
          { msg: 'Unexpected server error happened. Please try again later!' },
        ],
      });
    }
  },

  updateStats: async (req, res, _next) => {
    // Check for errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      current_customers,
      current_employees,
      current_free_tables,
    } = req.body;

    try {
      const user = await User.findById(req.user.id);
      if (!user.is_admin || !user.restaurant_id) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Restaurant not found!' }] });
      }
      const restaurant = await Restaurant.findById(user.restaurant_id);

      if (current_customers) restaurant.current_customers = current_customers;
      if (current_employees) restaurant.current_employees = current_employees;
      if (current_free_tables)
        restaurant.current_free_tables = current_free_tables;

      await restaurant.save();
      return res.status(200).json(restaurant);
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
