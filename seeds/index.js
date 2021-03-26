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
  console.log('Running seeds...');
  connectDB();
  await sleep(2);

  await mongoose.connection.db.dropDatabase(() => {
    console.log('Dropping database...');
  });

  console.log('Generating data...');

  await Restaurant.generateRestaurants(1);
  // await Record.generateDaysRecords(7, '604e4302a6587c5209ae4682');
  console.log('Finished running seeds!');
  process.exit();
};

run();
