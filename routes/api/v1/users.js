'use strict';
const express = require('express');
const router = express.Router();
const auth = require('../../../middlewares/jwtAuth');
const {
  update,
  register,
  confirmSignUp,
  deleteUser,
  getAllUsers,
  getOneUserForId
} = require('../../../controllers/userController.js');
const {forgotPassword, resetPassword} = require('../../../controllers/resetPasswordController');
const User = require('../../../models/User');

// Forgot Password
router.put('/forgot-password', forgotPassword);
// Reset Password
router.put('/new-password/:token', resetPassword);

// /user
router.get('/', getAllUsers); //TODO: if auth implement
router.get('/:userId', getOneUserForId); //TODO: if auth implement
router.post('/register', register);
router.put('/confirm-signup/:confirmToken', confirmSignUp);
router.delete('/:userId', deleteUser); //TODO Volver A PONER jwt middleware
router.put('/:userId', auth, update);

module.exports = router;
