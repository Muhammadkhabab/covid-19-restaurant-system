// Server routing.
const express = require('express');
const router = express.Router();

// Middleware.
const auth = require('../../../middleware/auth');

// Validation.
const { check } = require('express-validator');

// Authentication controller.
const authController = require('../controllers/auth');


// @route     POST /auth
// @desc      Authenticate user & get token.
// @access    Public
router.post(
    '/',
    [
      // Data validations.
        check('credential', 'Email/Username is required!').notEmpty(),
        check('password', 'Password is required!').notEmpty(),
    ],
    authController.login
    );


module.exports = router;
