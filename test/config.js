const mongoose = require('mongoose');
const models = require('./models/index');
// const routes = require('./api/v1/index');

before((done) => {
  const localDB = 'mongodb://localhost/safedining_testdb';
  const remoteDB = process.env.MONGO_URI_TEST;
  mongoose.connect(localDB, {
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
  // routes();
});
