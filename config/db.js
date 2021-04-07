const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const chooseDB = () => {
  let defaultDB;
  if (process.env.NODE_ENV === 'production') {
    defaultDB = process.env.MONGO_URI_PROD;
  } else if (process.env.NODE_ENV === 'test') {
    if (
      process.env.INDV_MONGO_URI_TEST &&
      process.env.USE_INDIVIDUAL_TEST_DB === 'yes'
    ) {
      console.log('Individual test database...');
      defaultDB = process.env.INDV_MONGO_URI_TEST;
    } else {
      console.log('Shared test database...');
      defaultDB = process.env.MONGO_URI_TEST;
    }
  } else {
    if (
      process.env.INDV_MONGO_URI_DEV &&
      process.env.USE_INDIVIDUAL_DEV_DB === 'yes'
    ) {
      console.log('Individual development database...');
      defaultDB = process.env.INDV_MONGO_URI_DEV;
    } else {
      console.log('Shared development database...');
      defaultDB = process.env.MONGO_URI_DEV;
    }
  }
  return defaultDB;
};

const connectDB = (db = null) => {
  if (!db) {
    db = chooseDB();
  }

  return new Promise(async (resolve) => {
    mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    mongoose.connection
      .once('open', () => {
        console.log('MongoDB connected...');
        return resolve();
      })
      .on('error', (err) => {
        console.error(err.message);
        // Exit process with failure.
        process.exit(1);
      });
  });
};

module.exports = connectDB;
