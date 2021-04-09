const register = require('./register');
const getUser = require('./getUser');
const update = require('./update');

module.exports = user = () => {
  describe('User routes', () => {
    register();
    getUser();
    update();
  });
};

