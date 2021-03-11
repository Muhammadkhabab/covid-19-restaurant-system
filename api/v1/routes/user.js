// Server routing.
const express = require('express');
const router = express.Router();

// Middleware.
const auth = require('../../../middleware/auth');

// Validation.
const { check } = require('express-validator');

// User controller.
const userController = require('../controllers/user');


// @route     POST /users
// @desc      Register user
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
        check('birth_date')
        .notEmpty()
        .isDate(),
        check('password')
        .isLength({ min: 6, max: 20 })
        .withMessage('Password must be between 6 and 20 characters long!')
        .matches(/\d/)
        .withMessage('Password must contain a number!'),
        check('confirmed_password').notEmpty(),
    ],
    userController.register
    );

// @route     GET /users
// @desc      Get user information except password
// @access    Public

router.get('/', auth, userController.getUser);


// @route     PUT /users
// @desc      Update user information
// @access    Public
router.put(
    '/',
    auth,
    [
      // Data validations.
        check('first_name').optional().notEmpty(),
        check('last_name').optional().notEmpty(),
        check('username').optional().notEmpty(),
        check('email', 'Please enter a valid email!').optional().isEmail(),
        check('phone_number').optional().notEmpty(),
        check('old_password').optional().notEmpty(),
        check('new_password')
        .optional()
        .isLength({ min: 6, max: 20 })
        .withMessage('Password must be between 6 and 20 characters long!')
        .matches(/\d/)
        .withMessage('Password must contain a number!'),
        check('confirmed_newpassword').optional().notEmpty(),

    ],
    userController.update
    );





module.exports = router;
