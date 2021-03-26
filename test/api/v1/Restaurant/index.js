const create = require('./create');
const update = require('./update');
const updateStats = require('./updateStats');
const deleteRestaurant = require('./deleteRestaurant');
const getAll = require('./getAll');
const getMy = require('./getMy');
const filter = require('./filter');
const getChartData = require('./getChartData');
const getById = require('./getById');


module.exports = restaurant = () => {
  describe('Restaurant routes', () => {
    create();
    update();
    updateStats();
    getAll();
    getMy();
    getById();
    deleteRestaurant();
    //filter();
    //getChartData();
  });
};
