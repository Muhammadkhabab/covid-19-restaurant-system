const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

//Selecting database
let db;
if (process.env.NODE_ENV === 'production') {
  db = process.env.MONGO_URI_PROD;
} else if (process.env.NODE_ENV === 'test') {
  console.log('Test environment...');
  db = process.env.MONGO_URI_TEST;
} else {
  console.log('Development environment...');
  if (
    process.env.INDV_MONGO_URI_DEV &&
    process.env.USE_INDIVIDUAL_DB === 'yes'
  ) {
    db = process.env.INDV_MONGO_URI_DEV;
  } else {
    db = process.env.MONGO_URI_DEV;
  }
}

//Connecting to the Mongo Database
const connectDB = () => {
  mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  mongoose.connection
    .once('open', () => {
      console.log('MongoDB connected...');
    })
    .on('error', (err) => {
      console.error(err.message);
      // Exit process with failure.
      process.exit(1);
    });
};

module.exports = connectDB;
