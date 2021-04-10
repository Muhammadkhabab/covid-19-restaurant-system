// Validation.
const { validationResult } = require('express-validator');

// Authentication.
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Private data configurations.
const dotenv = require('dotenv');
dotenv.config();

// Link User model.
const User = require('../../../models/User');

module.exports = {
  // Get user information except password
  getUser: async (req, res, _next) => {
    try {
      // Retrieve user using id, exclude password when return.
      const user = await User.findById(req.user.id).select('-password');
      if (!user) {
        return res.status(404).json({ errors: [{ msg: 'User not found!' }] });
      }

      return res.status(200).json(user);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        errors: [
          { msg: 'Unexpected server error happened. Please try again later!' },
        ],
      });
    }
  },

  //Register a user
  register: async (req, res, _next) => {
    // Check for errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring data from request body.
    const {
      first_name,
      last_name,
      username,
      email,
      password,
      confirmed_password,
      phone_number,
    } = req.body;

    try {
      // Check if user exists (check if email or username exists).
      let sameEmail = await User.findOne({ email });
      const errors = [];
      if (sameEmail) {
        errors.push({
          msg: 'Email was already taken. Please enter another email!',
        });
      }
      let sameUsername = await User.findOne({ username });
      if (sameUsername) {
        errors.push({
          msg: 'Username was already taken. Please enter another username!',
        });
      }
      if (password !== confirmed_password) {
        errors.push({
          msg: 'Passwords do not match!',
        });
      }
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      // Create new user.
      const user = new User({
        first_name,
        last_name,
        username,
        email,
        password,
        phone_number,
      });

      // Encrypt password.
      const salt = await bcrypt.genSalt(15);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      // Return jsonwebtoken.
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: 86400 },
        (err, token) => {
          if (err) throw err;
          return res.status(200).json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        errors: [
          { msg: 'Unexpected server error happened. Please try again later!' },
        ],
      });
    }
  },

  //Update user information
  update: async (req, res, _next) => {
    // Check for errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring data from request body.
    const {
      first_name,
      last_name,
      username,
      email,
      old_password,
      new_password,
      confirmed_newpassword,
      phone_number,
    } = req.body;

    try {
      const user = await User.findById(req.user.id);
      const errors = [];

      // Check if email was updated.
      if (user.email !== email) {
        // Check if new email exists.
        let sameEmail = await User.findOne({ email });
        if (sameEmail) {
          errors.push({
            msg: 'Email was already taken. Please enter another email!',
          });
        }
      }

      // Check if username was updated
      if (user.username !== username) {
        // Check if new username exists.
        let sameUsername = await User.findOne({ username });
        if (sameUsername) {
          errors.push({
            msg: 'Username was already taken. Please enter another username!',
          });
        }
      }

      // Check if staffKey is the same

      if (old_password && new_password && confirmed_newpassword) {
        // Check if old password matches.
        const isMatch = await bcrypt.compare(old_password, user.password);
        if (!isMatch) {
          errors.push({
            msg: 'Existing password is not correct! Please try again!',
          });
        }

        // Check if new password is similar to old password.
        if (new_password === old_password) {
          errors.push({
            msg: 'New password cannot be the same as old password!',
          });
        }

        // Check if passwords match.
        if (new_password !== confirmed_newpassword) {
          errors.push({
            msg: 'Passwords do not match!',
          });
        }

        if (errors.length > 0) {
          return res.status(401).json({ errors });
        }

        // Encrypt new password.
        const salt = await bcrypt.genSalt(15);
        user.password = await bcrypt.hash(new_password, salt);
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      if (first_name) user.first_name = first_name;
      if (last_name) user.last_name = last_name;
      if (username) user.username = username;
      if (email) user.email = email;
      if (phone_number) user.phone_number = phone_number;

      await user.save();

      delete user._doc.password;

      return res.status(200).json(user);
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
