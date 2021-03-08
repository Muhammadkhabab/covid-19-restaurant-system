// Server routing.
const express = require('express');
const router = express.Router();

// Middleware.
const auth = require('../../../middleware/auth');

// Validation.
const { check } = require('express-validator');

// Notification controller.
const notificationController = require('../controllers/notification');


module.exports = router;
