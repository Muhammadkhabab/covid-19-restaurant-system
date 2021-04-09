const mongoose = require('mongoose');
const models = require('./models/index');
const routes = require('./api/v1/index');
const dotenv = require('dotenv');
dotenv.config();

before((done) => {
  let db;
  if (
    process.env.INDV_MONGO_URI_TEST &&
    process.env.USE_INDIVIDUAL_TEST_DB === 'yes'
  ) {
    console.log('Selecting individual test database...');
    db = process.env.INDV_MONGO_URI_TEST;
  } else {
    console.log('Selecting shared test database...');
    db = process.env.MONGO_URI_TEST;
  }
  mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  mongoose.connection
    .once('open', () => {
      console.log('Test database connected...');
      mongoose.connection.db.dropDatabase(() => {
        console.log('Test database reset...');
        done();
      });
    })
    .on('error', (err) => {
      done(err);
    });
});

after(() => {
  console.log('Finish testing!');
});

describe('----- TESTING -----', () => {
  models();
  routes();
});
