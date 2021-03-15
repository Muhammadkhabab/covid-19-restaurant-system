const mongoose = require('mongoose');

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
      });

      user.is_admin = true;
      user.is_customer = false;

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
    return res.status(200).json({ restaurant });
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
  // Check for errors.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
    // Check for errors.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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

filter: async (req, res, _next) => {

  // Check for errors.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    search,
    cuisine,
    dine_in,
    dine_outside,
    pickup,
    curbside_pickup,
    delivery,
    tables_distance,
    user_distance,
    current_percent_capacity,
    total_customers,} = req.query;

  const filterArray = {}

  try {
    //If criteria exists, add to the conditions
    if(search){
      filterArray["restaurant_name"] = {"$regex":search,"$options":"i"}
    }
    if(cuisine){
      filterArray["cuisine"]= cuisine
    }
    if(dine_in){
      filterArray["dine_in"] = dine_in
    }
    if(dine_outside){
      filterArray["dine_outside"] = dine_outside
    }
    if(pickup){
      filterArray["pickup"] = pickup
    }
    if(curbside_pickup){
      filterArray["curbside_pickup"] = curbside_pickup
    }
    if(delivery){
      filterArray["delivery"] = delivery
    }
    if(tables_distance){
      filterArray["tables_distance"]= {"$gte":tables_distance}
    }
    //LATER ITERATION
    //TODO : Get the distance between the restaurant and the user
    //If the user is within the users_distance value, return the restaurant
    if(user_distance){
        
    }

    if(current_percent_capacity){
      filterArray["current_percent_capacity"] = {"$lte":current_percent_capacity}
    }

    if(total_customers){
      filterArray["current_customers"] = {"$lte":total_customers}
    }
    
    //filtered restaurant object
    const filtered_restaurant = await Restaurant.find(filterArray)
    //numbers of filtered restaurant
    const num_restaurants = Object.keys(filtered_restaurant).length;

    if(filtered_restaurant){
      return res.status(200).json({num_restaurants,filtered_restaurant});
    }
    else{
      return res
      .status(404)
      .json({ errors: [{ msg: 'Filter result does not exist' }] });
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
    if ((!user.is_admin && !user.is_staff) || !user.restaurant_id) {
      return res
        .status(404)
        .json({ errors: [{ msg: 'Restaurant not found!' }] });
    }
    const restaurant = await Restaurant.findById(user.restaurant_id);

    restaurant.current_customers = current_customers;
    restaurant.current_employees = current_employees;
    restaurant.current_free_tables = current_free_tables;

    const record = await new Record({
      current_customers,
      current_employees,
      current_free_tables,
    });
    record.restaurant_id = restaurant._id;

    await record.save();
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

getChartData: async (req, res, _next) => {
  try {
    const agg = [
      {
        $match: {
          aggregated: false,
          restaurant_id: mongoose.Types.ObjectId(req.params.restaurant_id),
        },
      },
      {
        $project: {
          // rid: '$restaurant_id',
          year: {
            $year: '$created_at',
          },
          month: {
            $month: '$created_at',
          },
          day: {
            $dayOfMonth: '$created_at',
          },
          hour: {
            $hour: '$created_at',
          },
          nc: '$current_customers',
          ne: '$current_employees',
          nt: '$current_free_tables',
        },
      },
      {
        $group: {
          _id: {
            // rid: '$rid',
            year: '$year',
            month: '$month',
            day: '$day',
            hour: '$hour',
          },
          nc: {
            $avg: '$nc',
          },
          ne: {
            $avg: '$ne',
          },
          nt: {
            $avg: '$nt',
          },
        },
      },
      {
        $project: {
          _id: 0,
          year: '$_id.year',
          month: '$_id.month',
          day: '$_id.day',
          hour: '$_id.hour',
          num_customers: {
            $round: ['$nc', 0],
          },
          num_employees: {
            $round: ['$ne', 0],
          },
          num_tables: {
            $round: ['$nt', 0],
          },
        },
      },
    ];
    const data = await Record.aggregate(agg);
    const formatted_data = data.map((e) => {
      const { year, month, day, hour } = e;
      return {
        ...e,
        timestamp: new Date(Date.UTC(year, month - 1, day, hour)),
      };
    });
    console.log(data);
    return res.status(200).json(formatted_data);
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
