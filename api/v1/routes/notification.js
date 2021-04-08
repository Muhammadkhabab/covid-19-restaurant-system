// Server routing.
const express = require('express');
const router = express.Router();

// Middleware.
const auth = require('../../../middleware/auth');

// Validation.
const { check } = require('express-validator');

// Notification controller.
const notificationController = require('../controllers/notification');

// @route     DEL /notifications/id
// @desc      Delete a notification
// @access    Private
router.delete('/:nid', auth, notificationController.delete);

// @route     POST /notifications
// @desc      Sign up for a notification
// @access    Public
router.post(
  '/',
  [
    // Data validations.
    check('is_contact_email').notEmpty().isBoolean(),
    check('contact').notEmpty(),
    check('location_lat').optional().isNumeric(),
    check('location_long').optional().isNumeric(),
    check('start_time').notEmpty().isISO8601(),
    check('end_time').notEmpty().isISO8601(),
    check('interval').optional().isNumeric(),
    check('max_distance').optional().isNumeric(),
    check('min_table_distance').optional().isNumeric(),
    check('cuisine')
      .optional()
      .isIn([
        'American',
        'Indian',
        'Asian',
        'Mediterranean',
        'Mexican',
        'Thai',
        'All',
      ])
      .withMessage('Please enter a valid type of cuisine.'),
    check('dine_in').optional().isBoolean(),
    check('dine_outside').optional().isBoolean(),
    check('pickup').optional().isBoolean(),
    check('curbside_pickup').optional().isBoolean(),
    check('delivery').optional().isBoolean(),
    check('max_employees').optional().isNumeric(),
    check('max_customers').optional().isNumeric(),
    check('min_tables').optional().isNumeric(),
    check('percent_capacity').optional().isNumeric(),
  ],
  notificationController.subscribe
);

// @route     GET /notifications
// @desc      Get my notifications
// @access    Private
router.get('/', auth, notificationController.get);

module.exports = router;
