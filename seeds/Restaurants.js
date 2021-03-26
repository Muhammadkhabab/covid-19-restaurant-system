const faker = require('faker');
const Restaurant = require('../models/Restaurant');

const generateBoolean = () => {
  return Math.random() < 0.5;
};

const generateNumber = (lower, upper) => {
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const generateRestaurant = async () => {
  const restaurant = new Restaurant({
    restaurant_name: faker.company.companyName(),
    address: faker.address.streetAddress(),
    restaurant_email: faker.internet.email(),
    restaurant_phone_number: faker.phone.phoneNumber(),
    website_url: faker.internet.url(),
    dine_in: generateBoolean(),
    dine_outside: generateBoolean(),
    pickup: generateBoolean(),
    curbside_pickup: generateBoolean(),
    delivery: generateBoolean(),
    policy_notes: faker.lorem.sentence(),
    employee_capacity: generateNumber(10, 25),
    customer_capacity: generateNumber(20, 100),
    number_tables: generateNumber(10, 20),
    square_footage: generateNumber(300, 2000),
    customer_per_table: generateNumber(3, 10),
    tables_distance: generateNumber(3, 10),
  });

  return new Promise(async (resolve) => {
    await restaurant.save();
    return resolve(id);
  });
};

module.exports = {
  generateRestaurants: async (num) => {
    if (num <= 0) {
      return;
    }
    return new Promise(async (resolve) => {
      console.log('Generating fake restaurants...');
      for (let i = 0; i < num; i++) {
        console.log(`Restaurant #${i + 1}`);
        const id = await generateRestaurant();
        console.log(id);
      }
      console.log(`${num} fake restaurants generated!`);
      return resolve();
    });
  },
};
