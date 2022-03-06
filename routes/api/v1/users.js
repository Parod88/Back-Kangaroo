'use strict';

const express = require('express');
const router = express.Router();
const {exampleUserMethod} = require('../../../controllers/userController.js');
const {forgotPassword, resetPassword} = require('../../../controllers/resetPasswordController');

// Routes
router.get('/', exampleUserMethod);

// Forgot Password
router.put('/forgot-password', forgotPassword);
// Reset Password
router.put('/new-password/:token', resetPassword);

module.exports = router;
