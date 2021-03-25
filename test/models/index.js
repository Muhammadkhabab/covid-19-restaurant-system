const mongoose = require('mongoose');
const user = require('./User/index');
const restaurant = require('./Restaurant/index');

module.exports = models = () => {
  describe('Models', () => {
    beforeEach((done) => {
      mongoose.connection.dropCollection('users', () => {
        done();
      });
    });

    user();
    restaurant();
  });
};
