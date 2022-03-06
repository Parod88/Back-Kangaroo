'use strict';

const express = require('express');
const router = express.Router();
const auth = require('../../../middlewares/jwtAuth')
const {exampleUserMethod} = require('../../../controllers/userController.js');
const {update} = require('../../../controllers/userController.js');
const {register} = require('../../../controllers/userController.js');
const {forgotPassword, resetPassword} = require('../../../controllers/resetPasswordController');
const {deleteUser} = require('../../../controllers/userController.js');


// Routes
router.get('/', exampleUserMethod);
router.put('/:userId', auth, update);
router.delete('/:userId', auth, deleteUser);

// Forgot Password
router.put('/forgot-password', forgotPassword);
// Reset Password
router.put('/new-password/:token', resetPassword);

module.exports = router;
