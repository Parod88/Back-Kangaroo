'use strict';

const express = require('express');
const router = express.Router();
const {exampleUserMethod} = require('../../../controllers/userController.js');
const {update} = require('../../../controllers/userController.js');
const {register} = require('../../../controllers/userController.js');
const auth = require('../../../middlewares/jwtAuth')

// Routes
router.get('/', exampleUserMethod);
router.put('/:userId', auth, update);

module.exports = router;
