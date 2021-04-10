const faker = require('faker');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const generateNumber = (lower, upper) => {
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const generateUsername = (firstName, lastName) => {
  const num = generateNumber(1, 100);
  return [firstName, lastName, num].join('').toLowerCase();
};

const generateUser = async (admin = false) => {
  const first_name = faker.name.firstName();
  const last_name = faker.name.lastName();
  const user = {
    first_name: first_name,
    last_name: last_name,
    username: generateUsername(first_name, last_name),
    phone_number: faker.phone.phoneNumberFormat(),
    email: faker.internet.email(first_name, last_name).toLowerCase(),
    is_admin: admin,
    is_staff: false,
    is_developer: false,
    is_customer: !admin,
  };
  return user;
};

module.exports = {
  generateAdmins: async (rids) => {
    if (rids.length <= 0) {
      return;
    }
    return new Promise(async (resolve) => {
      const salt = await bcrypt.genSalt(15);
      const password = await bcrypt.hash('abc123', salt);

      console.log('Generating fake admins...');

      const data = [];
      for (let i = 0; i < rids.length; i++) {
        const user = await generateUser(true);
        user.password = password;
        user.restaurant_id = rids[i];
        data.push(user);
      }
      await User.insertMany(data);

      console.log(`${rids.length} fake admins generated!`);
      return resolve();
    });
  },

  generateCustomers: async (num) => {
    if (num <= 0) {
      return;
    }
    return new Promise(async (resolve) => {
      const salt = await bcrypt.genSalt(15);
      const password = await bcrypt.hash('abc123', salt);

      console.log('Generating fake customers...');

      const data = [];
      for (let i = 0; i < num; i++) {
        const user = await generateUser();
        user.password = password;
        data.push(user);
      }
      await User.insertMany(data);

      console.log(`${num} fake customers generated!`);
      return resolve();
    });
  },

  generateHarryAdmin: async (rid) => {
    return new Promise(async (resolve) => {
      const harry = User({
        first_name: 'Harry',
        last_name: 'Le',
        username: generateUsername('Harry', 'Le'),
        phone_number: '608-923-3447',
        email: 'khoa165@gmail.com',
        is_admin: true,
        is_staff: false,
        is_developer: false,
        is_customer: false,
      });

      const salt = await bcrypt.genSalt(15);
      const password = await bcrypt.hash('abc123', salt);
      harry.password = password;
      harry.restaurant_id = rid;
      await harry.save();
      return resolve();
    });
  },
};
