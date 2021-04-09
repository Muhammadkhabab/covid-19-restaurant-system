const auth = require('./Auth/index');
const user = require('./User/index');
const restaurant = require('./Restaurant/index');
const notification = require('./Notification');

module.exports = routes = () => {
  describe('Routes', () => {
    auth();
    user();
    restaurant();
    notification();
  });
};
