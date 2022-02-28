'use strict';

const express = require('express');
const router = express.Router();
const {
  exampleAdvertisementMethod,
  getAdvertisementsList,
  getPaginatedAdvertisementsList
} = require('../../../controllers/advertisementController.js');

// Routes
router.get('/', getAdvertisementsList);

router.get('/:page', getPaginatedAdvertisementsList);

module.exports = router;
