const faker = require('faker');
const Restaurant = require('../models/Restaurant');

const generateBoolean = () => {
  return Math.random() < 0.5;
};

const generateNumber = (lower, upper) => {
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const generateRestaurant = async () => {
  const customer_capacity = generateNumber(20, 100);
  const employee_capacity = generateNumber(3, 20);
  const number_tables = generateNumber(5, 30);
  const current_customers = generateNumber(0, customer_capacity);
  const current_employees = generateNumber(0, employee_capacity);
  const current_free_tables = generateNumber(0, number_tables);
  
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
    employee_capacity: employee_capacity,
    customer_capacity: customer_capacity,
    number_tables: number_tables,
    square_footage: generateNumber(300, 2000),
    customer_per_table: generateNumber(3, 10),
    tables_distance: generateNumber(3, 10),
    current_customers: current_customers,
    current_employees: current_employees,
    current_free_tables: current_free_tables,
    current_percent_capacity: (current_customers+current_employees)/(customer_capacity+employee_capacity)
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
