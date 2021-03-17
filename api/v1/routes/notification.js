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
router.delete(
  '/:nid',
  auth,
  notificationController.delete
);

// @route     POST /notifications
// @desc      Sign up for a notification
// @access    Private
router.post(
  '/',
  auth,
  [
    // Data validations.
    check('is_text').optional().isBoolean(),
    check('is_email').optional().isBoolean(),
    check('lat').optional().isNumeric(),
    check('long').optional().isNumeric(),
    check('date_requested').notEmpty().isDate(),
    check('start_time').notEmpty().isNumeric(),
    check('end_time').notEmpty().isNumeric(),
    check('max_distance').optional().isNumeric(),
    check('cuisine')
      .optional()
      .isIn(['American', 'Indian', 'Asian', 'Mediterranean', 'Mexican', 'Thai', 'All'])
      .withMessage('Please enter a valid type of cuisine.'),
    check('dine_in').optional().isBoolean(),
    check('dine_out').optional().isBoolean(),
    check('pickup').optional().isBoolean(),
    check('curbside').optional().isBoolean(),
    check('delivery').optional().isBoolean(),
    check('max_empl').optional().isNumeric(),
    check('max_cust').optional().isNumeric(),
    check('max_cust_per_table').optional().isNumeric(),
    check('min_table_distance').optional().isNumeric(),
  ],
  notificationController.subscribe
);

// @route     GET /notifications
// @desc      Get my notifications
// @access    Private
router.get('/', auth, notificationController.get);

module.exports = router;
