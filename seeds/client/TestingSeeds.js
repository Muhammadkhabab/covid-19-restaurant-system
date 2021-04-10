const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const { getMaxListeners } = require('../../models/User');
const Restaurant = require('../../models/Restaurant');

const testRestaurant = new Restaurant({
  restaurant_name: "Test Restaurant",
  address: "100 State Street",
  avatar:
    'https://images.squarespace-cdn.com/content/v1/578d4c7a8419c227c750b539/1572971173664-VMLWSYNF0B1T0WT99MT5/ke17ZwdGBToddI8pDm48kDldiTmRHKJ5v0YqxgeTKYoUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcILJf9YR3LP5aM5G6UY-AAu_ngb_bs84XNd2m-CICIhr-FNO5NkILC6XZG9VcRQgL/Milk+Tea_smaller+v2.jpg',
  restaurant_email: "testRestauarant@gmail.com",
  restaurant_phone_number: 555-555-5555,
  website_url: "www.testRestauarant.com",
  dine_in: true,
  dine_outside: false,
  pickup: false,
  curbside_pickup: false,
  delivery: true,
  policy_notes: "Test Restauarnt Policy",
  employee_capacity: 20,
  customer_capacity: 50,
  number_tables: 15,
  square_footage: 1500,
  customer_per_table: 4,
  tables_distance: 6,
  current_customers: 30,
  current_employees: 15,
  current_free_tables: 4,
});

module.exports = {
  addTestUser: async () => {
    return new Promise(async (resolve) => {
      const salt = await bcrypt.genSalt(15);
      const password = await bcrypt.hash('abc123', salt);

      const user = {
        first_name: "testFirst",
        last_name: "testLast",
        username: "testUsername",
        password: password,
        phone_number: "555-555-5555",
        email: "testUser@gmail.com",
        is_admin: false,
        is_staff: false,
        is_developer: false,
        is_customer: true,
      };
      
      await User.create(user);
      console.log(`Test customer generated!`);
      return resolve();
    });
  },

  addTestAdmin: async (rid) => {
    return new Promise(async (resolve) => {
      const salt = await bcrypt.genSalt(15);
      const password = await bcrypt.hash('abc123', salt);

      testRestaurantUser = new User({
        first_name: "testRestaurantUser_first",
        last_name: "testRestaurantUser_last",
        username: "testRestaurantUser",
        password: password,
        phone_number: "123-456-1234",
        email: "testRestaurantUser@gmail.com",
        is_admin: true,
        is_staff: false,
        is_developer: false,
        is_customer: false,
        restaurant_id: rid,
      });

      console.log('Generating test admin...');

      testRestaurantUser.id = rid;
      await testRestaurantUser.save();
      return resolve();
    });
  },

  addTestRestaurant: async () => {
    return new Promise(async (resolve) => {
      console.log('Generating test restaurant...');
      await testRestaurant.save();
      return resolve(testRestaurant.id);
    });
  },
}