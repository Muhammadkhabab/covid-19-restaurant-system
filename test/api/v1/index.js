const auth = require('./Auth/index');
const user = require('./User/index');

module.exports = routes = () => {
  describe('Routes', () => {
    auth();
    user();
  });
};
