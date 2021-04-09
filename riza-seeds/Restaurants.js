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
  
  const restaurant1 = new Restaurant({
    restaurant_name: "Mooyah",
    address: "123 State St",
    avatar:
      'https://images.squarespace-cdn.com/content/v1/578d4c7a8419c227c750b539/1572971173664-VMLWSYNF0B1T0WT99MT5/ke17ZwdGBToddI8pDm48kDldiTmRHKJ5v0YqxgeTKYoUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcILJf9YR3LP5aM5G6UY-AAu_ngb_bs84XNd2m-CICIhr-FNO5NkILC6XZG9VcRQgL/Milk+Tea_smaller+v2.jpg',
    restaurant_email: "mooyah@gmail.com",
    restaurant_phone_number: "123456789",
    website_url: "mooyah.com",
    dine_in:1,
    dine_outside:1,
    pickup:1,
    curbside_pickup:1,
    delivery: 1,
    policy_notes: faker.lorem.sentence(),
    employee_capacity: 3,
    customer_capacity: 20,
    number_tables: 5,
    square_footage: 400,
    customer_per_table: 2,
    tables_distance: 4,
    current_customers: 6,
    current_employees: 3,
    current_free_tables: current_free_tables,
    current_percent_capacity: (current_customers+current_employees)/(customer_capacity+employee_capacity)
  });
  const restaurant2 = new Restaurant({
    restaurant_name: "FishFilet",
    address: "123 Union St",
    avatar:
      'https://images.squarespace-cdn.com/content/v1/578d4c7a8419c227c750b539/1572971173664-VMLWSYNF0B1T0WT99MT5/ke17ZwdGBToddI8pDm48kDldiTmRHKJ5v0YqxgeTKYoUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcILJf9YR3LP5aM5G6UY-AAu_ngb_bs84XNd2m-CICIhr-FNO5NkILC6XZG9VcRQgL/Milk+Tea_smaller+v2.jpg',
    restaurant_email: "fishfilet@gmail.com",
    restaurant_phone_number: "123456789",
    website_url: "fishfilet.com",
    dine_in:0,
    dine_outside:0,
    pickup:1,
    curbside_pickup:1,
    delivery: 1,
    policy_notes: faker.lorem.sentence(),
    employee_capacity: 3,
    customer_capacity: 20,
    number_tables: 5,
    square_footage: 450,
    customer_per_table: 2,
    tables_distance: 4,
    current_customers: 2,
    current_employees: 2,
    current_free_tables: 4,
    current_percent_capacity: (current_customers+current_employees)/(customer_capacity+employee_capacity)
  });

  return new Promise(async (resolve) => {
    await restaurant1.save();
    await restaurant2.save();
    const rid = [];
    rid.push(restaurant1.id);
    rid.push(restaurant2.id);

    return resolve(rid);
  });
};

module.exports = {
  generateRestaurants: async (num) => {
    if (num <= 0) {
      return;
    }
    // const rids = [];
    return new Promise(async (resolve) => {
      console.log('Generating fake restaurants...');
      // for (let i = 0; i < num; i++) {
      //   const rid = await generateRestaurant();
      //   rids.push(rid);
      // }
      const rids = await generateRestaurant();

      console.log(`2 fake restaurants generated!`);
      return resolve(rids);
    });
  },
};
