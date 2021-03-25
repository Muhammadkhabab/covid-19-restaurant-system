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
    check('first_name').notEmpty().withMessage('Missing first name!'),
    check('last_name').notEmpty().withMessage('Missing last name!'),
    check('username').notEmpty().withMessage('Missing username!'),
    check('email', 'Please enter a valid email!').isEmail(),
    check('phone_number').notEmpty().withMessage('Missing phone number!'),
    check('password')
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must be between 6 and 20 characters long!')
      .matches(/\d/)
      .withMessage('Password must contain a number!'),
    check('confirmed_password').notEmpty().withMessage('Missing confirmed password!'),
    check('restaurant_name').notEmpty().withMessage('Missing restaurant name!'),
    check('address').notEmpty().withMessage('Missing address!'),
    check('avatar').optional().isString(),
    check('restaurant_email').notEmpty().withMessage('Missing restaurant email!'),
    check('restaurant_phone_number').notEmpty().withMessage('Missing restaurant phone number!'),
    check('cuisine').optional().isString(),
    check('website_url').optional().isURL(),
    check('dine_in').notEmpty().isBoolean().withMessage('Missing dine in!'),
    check('dine_outside').notEmpty().isBoolean().withMessage('Missing dine outside!'),
    check('pickup').notEmpty().isBoolean().withMessage('Missing pickup!'),
    check('curbside_pickup').notEmpty().isBoolean().withMessage('Missing curbside pickup!'),
    check('delivery').notEmpty().isBoolean().withMessage('Missing delivery!'),
    check('policy_notes').optional(),
    check('employee_capacity').notEmpty().withMessage('Missing employee capacity!').isNumeric(),
    check('customer_capacity').notEmpty().withMessage('Missing customer capacity!').isNumeric(),
    check('number_tables').notEmpty().withMessage('Missing number tables!').isNumeric(),
    check('square_footage').isNumeric(),
    check('customer_per_table').isNumeric(),
    check('tables_distance').isNumeric(),
  ],
  restaurantController.create
);

// @route     PUT /restaurants
// @desc      Update restaurant info
// @access    Only admins of restaurant can do this.
router.put(
  '/',
  [
    auth,
    [
      check('restaurant_name').notEmpty(),
      check('address').notEmpty(),
      check('avatar').optional().isString(),
      check('restaurant_email').notEmpty(),
      check('restaurant_phone_number').notEmpty(),
      check('cuisine').optional().isString(),
      check('website_url').optional().isURL(),
      check('dine_in').notEmpty().isBoolean(),
      check('dine_outside').notEmpty().isBoolean(),
      check('pickup').notEmpty().isBoolean(),
      check('curbside_pickup').notEmpty().isBoolean(),
      check('delivery').notEmpty().isBoolean(),
      check('policy_notes').optional(),
      check('employee_capacity').notEmpty().isNumeric(),
      check('customer_capacity').notEmpty().isNumeric(),
      check('number_tables').notEmpty().isNumeric(),
      check('square_footage').isNumeric(),
      check('customer_per_table').isNumeric(),
      check('tables_distance').isNumeric(),
    ],
  ],
  restaurantController.update
);

// @route     PUT /restaurants/stats
// @desc      Update restaurant current number of
//            customers, employees, and free tables.
// @access    Only admins/staffs of restaurant can do this.
router.put(
  '/stats',
  [
    auth,
    [
      check('current_customers').notEmpty().isNumeric(),
      check('current_employees').notEmpty().isNumeric(),
      check('current_free_tables').notEmpty().isNumeric(),
    ],
  ],
  restaurantController.updateStats
);

// @route     DELETE /restaurants
// @desc      Delete restaurant
// @access    Only admin of restaurant can do this.
router.delete('/', auth, restaurantController.delete);

// @route     GET /restaurants
// @desc      Get all restaurants
// @access    Public.
router.get('/', restaurantController.getAll);

// @route     GET /restaurants/me
// @desc      Get my restaurant
// @access    Only admins/staffs of restaurant can do this.
router.get('/me', auth, restaurantController.getMy);

// @route     GET /restaurants/filter
// @desc      Filter criterias
// @access    public
// TODO: update cuisine filter
router.get(
  '/filter',
  [
    check('search').optional().isString(),
    check('cuisine').optional().isString(),
    check('dine_in').optional().isIn([0, 1]),
    check('dine_outside').optional().isIn([0, 1]),
    check('pickup').optional().isIn([0, 1]),
    check('curbside_pickup').optional().isIn([0, 1]),
    check('delivery').optional().isIn([0, 1]),
    check('tables_distance').optional().isNumeric(),
    check('user_distance').optional().isNumeric(),
    check('current_percent_capacity').optional().isNumeric(),
    check('total_customers').optional().isNumeric(),
  ],
  restaurantController.filter
);

// @route     GET /restaurants/chart/:restaurant_id
// @desc      Get restaurant chart data
// @access    OPublic.
router.get('/chart/:restaurant_id', restaurantController.getChartData);

// @route     GET /restaurants/:restaurant_id
// @desc      Get restaurant by id
// @access    Public
router.get('/:restaurant_id', restaurantController.getById);

module.exports = router;
