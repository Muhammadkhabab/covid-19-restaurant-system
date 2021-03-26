const auth = require('./Auth/index');
const user = require('./User/index');
const restaurant = require('./Restaurant/index');

module.exports = routes = () => {
  describe('Routes', () => {
    auth();
    user();
    restaurant();
  });
};
