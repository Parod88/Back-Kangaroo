'use strict';

const express = require('express');
const router = express.Router();
const {exampleUserMethod} = require('../../../controllers/userController.js');
const {deleteUser} = require('../../../controllers/userController.js');
const auth = require('../../../middlewares/jwtAuth')

// Routes
router.get('/', exampleUserMethod);
router.delete('/:userId', auth, deleteUser);

module.exports = router;
