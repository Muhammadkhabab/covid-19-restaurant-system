// Server routing.
const express = require('express');
const router = express.Router();

// Middleware.
const auth = require('../../../middleware/auth');

// Validation.
const { check } = require('express-validator');

// Restaurant controller.
const restaurantController = require('../controllers/restaurant');

// router.post(
//     '/',
//     [
//       // Data validations.
//         check('name').notEmpty(),
//     ],
//     restaurantController.create
//     );

router.get(
    '/',restaurantController.getAll)

router.get(
    '/me',auth,restaurantController.getMy);

module.exports = router;
