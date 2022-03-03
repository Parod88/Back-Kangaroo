'use strict';

const express = require('express');
const router = express.Router();
const {exampleUserMethod} = require('../../../controllers/userController.js');
const {register} = require('../../../controllers/userController.js');

// Routes
router.get('/', exampleUserMethod);

// post -> /user/register
router.post('/register', register);

module.exports = router;
