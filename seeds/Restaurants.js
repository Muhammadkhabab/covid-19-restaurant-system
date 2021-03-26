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
    avatar:
      'https://images.squarespace-cdn.com/content/v1/578d4c7a8419c227c750b539/1572971173664-VMLWSYNF0B1T0WT99MT5/ke17ZwdGBToddI8pDm48kDldiTmRHKJ5v0YqxgeTKYoUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcILJf9YR3LP5aM5G6UY-AAu_ngb_bs84XNd2m-CICIhr-FNO5NkILC6XZG9VcRQgL/Milk+Tea_smaller+v2.jpg',
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
    return resolve(restaurant.id);
  });
};

module.exports = {
  generateRestaurants: async (num) => {
    if (num <= 0) {
      return;
    }
    const rids = [];
    return new Promise(async (resolve) => {
      console.log('Generating fake restaurants...');
      for (let i = 0; i < num; i++) {
        const rid = await generateRestaurant();
        rids.push(rid);
      }
      console.log(`${num} fake restaurants generated!`);
      return resolve(rids);
    });
  },
};
