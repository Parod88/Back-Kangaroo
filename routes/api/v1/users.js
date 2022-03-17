'use strict';
const express = require('express');
const router = express.Router();
const auth = require('../../../middlewares/jwtAuth');
const {
  exampleUserMethod, //TODO BORRAR PARA PRODUCCION
  update,
  register,
  confirmSignUp,
  deleteUser
} = require('../../../controllers/userController.js');
const {forgotPassword, resetPassword} = require('../../../controllers/resetPasswordController');
const User = require('../../../models/User');

// Routes
router.get('/', exampleUserMethod);

// Forgot Password
router.put('/forgot-password', forgotPassword);
// Reset Password
router.put('/new-password/:token', resetPassword);

// /user
router.post('/register', register);
router.put('/confirm-signup/:confirmToken', confirmSignUp);
router.delete('/:userId', deleteUser); //TODO Volver A PONER jwt middleware
router.put('/:userId', auth, update);

module.exports = router;
