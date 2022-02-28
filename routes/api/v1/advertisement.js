'use strict';

const express = require('express');
const router = express.Router();
const {
  exampleAdvertisementMethod,
  getAdvertisementsList
} = require('../../../controllers/advertisementController.js');

// Routes
router.get('/', getAdvertisementsList);

module.exports = router;
