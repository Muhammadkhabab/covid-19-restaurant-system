
//RestaurantSeeds
const RestaurantSeeds = require('./Restaurants')
const AdminSeeds = require('./Admins')

const connectDB = require('../config/db');
connectDB();

//Seeding restaurant into the database
RestaurantSeeds.createRestaurants(4);

// Seeding admins info into the database
// AdminSeeds.createAdmins(4);

