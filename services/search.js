const Restaurant = require('../models/Restaurant');

module.exports = {
  searchRestaurants: async (params) => {
    const {
      search,
      cuisine,

      dine_in,
      dine_outside,
      pickup,
      curbside_pickup,
      delivery,

      tables_distance,
      current_free_tables,
      current_percent_capacity,
      total_customers,
      max_employees,
      max_customers,
    } = params;

    const searchBy = {};

    if (search) {
      searchBy['restaurant_name'] = { $regex: search, $options: 'i' };
    }
    if (cuisine) {
      searchBy['cuisine'] = { $regex: cuisine, $options: 'i' };
    }

    if (dine_in) {
      searchBy['dine_in'] = dine_in;
    }
    if (dine_outside) {
      searchBy['dine_outside'] = dine_outside;
    }
    if (pickup) {
      searchBy['pickup'] = pickup;
    }
    if (curbside_pickup) {
      searchBy['curbside_pickup'] = curbside_pickup;
    }
    if (delivery) {
      searchBy['delivery'] = delivery;
    }

    if (tables_distance) {
      searchBy['tables_distance'] = { $gte: tables_distance };
    }
    if (current_free_tables) {
      searchBy['current_free_tables'] = { $gte: current_free_tables };
    }
    if (current_percent_capacity) {
      searchBy['current_percent_capacity'] = {
        $lte: current_percent_capacity,
      };
    }
    if (total_customers) {
      searchBy['current_customers'] = { $lte: total_customers };
    }
    if (max_employees) {
      searchBy['employee_capacity'] = { $lte: max_employees };
    }
    if (max_customers) {
      searchBy['customer_capacity'] = { $lte: max_customers };
    }

    // Sort : 1 is ascending, -1 is descending
    const sortBy = {
      current_percent_capacity: 1,
      current_free_tables: -1,
      tables_distance: -1,
    };

    return new Promise(async (resolve, reject) => {
      try {
        const restaurants = await Restaurant.find(searchBy).sort(sortBy);
        return resolve({ count: restaurants.length, restaurants: restaurants });
      } catch (err) {
        return reject(err);
      }
    });
  },
};
