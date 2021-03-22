const Restaurant = require('./Restaurants');
const Record = require('./Records');
const Admin = require('./Admins');

const connectDB = require('../config/db');

const sleep = (s) => {
  return new Promise((resolve) => {
    setTimeout(resolve, s * 1000);
  });
};

const run = async () => {
  connectDB();
  await sleep(1.5);
  await Restaurant.generateRestaurants(0);
  await Record.generateDaysRecords(7, '604e4302a6587c5209ae4682');
  console.log('Finished running seeds!');
  process.exit();
};

run();
