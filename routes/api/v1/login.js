'use strict';

const express = require('express');
const router = express.Router();
const {login} = require('../../../controllers/loginController.js');
const {forgotPassword, resetPassword} = require('../../../controllers/resetPasswordController');

router.post('/', login);

// Forgot Password
router.put('/forgot-password', forgotPassword);
// Reset Password
router.put('/new-password', resetPassword);

module.exports = router;
