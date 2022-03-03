'use strict';

const express = require('express');
const router = express.Router();
const {
  getAdvertisementsList,
  getPaginatedAdvertisementsList,
  getAdvertById
} = require('../../../controllers/advertisementController.js');

// Routes
// GET routes
router.get('/', getAdvertisementsList);

router.get('/:p&:page', getPaginatedAdvertisementsList);

router.get('/:id', getAdvertById);

module.exports = router;
