// Validation.
const { validationResult } = require('express-validator');


// Link Record model
const Record = require('../../../models/Record');

// Link Restaurant model
const Restaurant = require('../../../models/Restaurant');

module.exports = {

    getAll: async (req, res, _next) => {
        try {

            // Return all restaurants
            const restaurants = await Restaurant.find()
            const num_restaurants = Object.keys(restaurants).length

            const response = {num_restaurants,restaurants}

            return res.status(200).json(response);
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({
            errors: [
                { msg: 'Unexpected server error happened. Please try again later!' },
            ],
            });
        }
    },

    getMy: async (req, res, _next) => {
        try {

            //Check if user exists
            const user = await User.findById(req.user.id)
            if (!user) {
                return res.status(404).json({ errors: [{ msg: 'User not found!' }] });
                }
            
            //Check if the user has a restaurant
            const restaurantId = user.restaurant_id
            //If restaurant does not exist for the user, prints error
            if(!restaurantId){
                return res.status(404).json({errors:[{msg: 'Restaurant does not exist!'}]});
            }

            if(!user.is_admin && !user.is_staff){
                return res.status(404).json({errors:[{msg: 'User is not authorized!'}]});
            }
            //If exists, respond with the restaurant information
            else{
                const myRestaurant = await Restaurant.findById(restaurantId)
                return res.status(200).json(myRestaurant);
            }
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({
            errors: [
                { msg: 'Unexpected server error happened. Please try again later!' },
            ],
            });
        }
    },

};
