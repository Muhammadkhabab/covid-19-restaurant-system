const User = require('../models/User');
const bcrypt = require('bcryptjs');

const testUser = async (admin = false) => {
  const first_name = "testFirst"
  const last_name = "testLast"
  const user = {
    first_name: first_name,
    last_name: last_name,
    username: "testUsername",
    phone_number: "555-555-5555",
    email: "testUser@gmail.com",
    is_admin: false,
    is_staff: false,
    is_developer: false,
    is_customer: true,
  };
  return user;
};

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
}