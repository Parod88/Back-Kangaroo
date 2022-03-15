'use strict';

const express = require('express');
const router = express.Router();
const auth = require('../../../middlewares/jwtAuth');
const {
  getAllUsers,
  getOneUserForId,
  register,
  update,
  deleteUser
} = require('../../../controllers/userController.js');
const {forgotPassword, resetPassword} = require('../../../controllers/resetPasswordController');

// Forgot Password
router.put('/forgot-password', forgotPassword);
// Reset Password
router.put('/new-password/:token', resetPassword);

// /user
router.get('/', getAllUsers); //TODO: if auth implement
router.get('/:userId', getOneUserForId); //TODO: if auth implement
router.post('/register', register);
router.put('/:userId', auth, update);
router.delete('/:userId', auth, deleteUser);

module.exports = router;
