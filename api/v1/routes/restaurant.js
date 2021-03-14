// Server routing.
const express = require('express');
const router = express.Router();

// Middleware.
const auth = require('../../../middleware/auth');

// Validation.
const { check } = require('express-validator');

// Restaurant controller.
const restaurantController = require('../controllers/restaurant');

// @route     POST /restaurants
// @desc      Create admin account and new restaurant
// @access    Public
router.post(
  '/',
  [
    // Data validations.
    check('first_name').notEmpty(),
    check('last_name').notEmpty(),
    check('username').notEmpty(),
    check('email', 'Please enter a valid email!').isEmail(),
    check('phone_number').notEmpty(),
    //Birthdate is a Date() object with YYYY/MM/DD format
    check('birth_date').notEmpty().isDate(),
    check('password')
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must be between 6 and 20 characters long!')
      .matches(/\d/)
      .withMessage('Password must contain a number!'),
    check('confirmed_password').notEmpty(),

    check('restaurant_name').notEmpty(),
    check('address').notEmpty(),
    check('restaurant_email').notEmpty(),
    check('restaurant_phone_number').notEmpty(),
    check('website_url').optional().isURL(),
    check('dine_in').notEmpty().isIn([0, 1]),
    check('dine_outside').notEmpty().isIn([0, 1]),
    check('pickup').notEmpty().isIn([0, 1]),
    check('curbside_pickup').notEmpty().isIn([0, 1]),
    check('delivery').notEmpty().isIn([0, 1]),
    check('policy_notes').optional(),
    check('employee_capacity').notEmpty().isNumeric(),
    check('customer_capacity').notEmpty().isNumeric(),
    check('number_tables').notEmpty().isNumeric(),
    check('square_footage').isNumeric(),
    check('customer_per_table').isNumeric(),
    check('tables_distance').isNumeric(),
  ],
  restaurantController.create
);

// @route     PUT /restaurants
// @desc      Update restaurant info
// @access    Public
router.put(
  '/',
  [
    auth,
    [
      check('restaurant_name').notEmpty(),
      check('address').notEmpty(),
      check('restaurant_email').notEmpty(),
      check('restaurant_phone_number').notEmpty(),
      check('website_url').optional().isURL(),
      check('dine_in').notEmpty().isIn([0, 1]),
      check('dine_outside').notEmpty().isIn([0, 1]),
      check('pickup').notEmpty().isIn([0, 1]),
      check('curbside_pickup').notEmpty().isIn([0, 1]),
      check('delivery').notEmpty().isIn([0, 1]),
      check('policy_notes').optional(),
      check('employee_capacity').notEmpty().isNumeric(),
      check('customer_capacity').notEmpty().isNumeric(),
      check('number_tables').notEmpty().isNumeric(),
      check('square_footage').isNumeric(),
      check('customer_per_table').isNumeric(),
      check('tables_distance').isNumeric(),
    ],
  ],
  restaurantController.create
);

// @route     DELETE /restaurants
// @desc      Delete restaurant
// @access    Only admin of restaurant can do this.
router.delete('/', auth, restaurantController.delete);

module.exports = router;
