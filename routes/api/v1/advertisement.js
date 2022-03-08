'use strict';

const express = require('express');
const router = express.Router();
const {
  getAdvertisementsList,
  getPaginatedAdvertisementsList,
  createAdvert,
  getAdvertById,
  updateAdvertById,
  deleteAdvertById
} = require('../../../controllers/advertisementController.js');

// Routes
// GET routes
router.get('/', getAdvertisementsList);

router.get('/:page', getPaginatedAdvertisementsList);

router.get('/:_id', getAdvertById);

router.post('/', createAdvert);

router.put('/:_id', updateAdvertById);

router.delete('/:_id', deleteAdvertById);

module.exports = router;
