const mongoose = require('mongoose');
const Restaurant = require('./Restaurants');
const User = require('./Users');
const Record = require('./Records');

const connectDB = require('../config/db');

const sleep = (s) => {
  return new Promise((resolve) => {
    setTimeout(resolve, s * 1000);
  });
};

const configureDB = () => {
  return new Promise(async (resolve) => {
    connectDB();
    await sleep(2);
    mongoose.connection.db.dropDatabase(() => {
      console.log('Dropping database...');
    });
    await sleep(2);
    return resolve();
  });
};

const generate = () => {
  return new Promise(async (resolve) => {
    const n1 = 30;
    const rids1 = await Restaurant.generateRestaurants(n1);
    await User.generateAdmins(rids1);
    await Record.generateRecordsMultipleRestaurants(rids1);

    // const n2 = 35;
    // const rids2 = await Restaurant.generateRestaurants(n2);
    // await User.generateAdmins(rids2);

    const n3 = 100;
    await User.generateCustomers(n3);
    console.log('----------------------');
    console.log('Total data generated:');
    console.log(`- ${n1} admins`);
    console.log(`- ${n3} customers`);
    console.log(`- ${n1} restaurants`);
    console.log(`- ${n1 * 7 * 24} records`);

    return resolve();
  });
};

const run = async () => {
  try {
    console.log('Running seeds...');
    await configureDB();
    console.log('Generating data...');
    await generate();
    console.log('Finished running seeds!');
    process.exit();
  } catch (err) {
    process.exit(1);
  }
};

run();
