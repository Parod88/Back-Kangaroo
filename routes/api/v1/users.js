'use strict';

const express = require('express');
const router = express.Router();
const {exampleUserMethod} = require('../../../controllers/userController.js');
const {forgotPassword, resetPassword} = require('../../../controllers/resetPasswordController');
const {deleteUser} = require('../../../controllers/userController.js');
const auth = require('../../../middlewares/jwtAuth')

// Routes
router.get('/', exampleUserMethod);
router.delete('/:userId', auth, deleteUser);

// Forgot Password
router.put('/forgot-password', forgotPassword);
// Reset Password
router.put('/new-password/:token', resetPassword);

module.exports = router;
