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
router.get('/', getAdvertisementsList);

router.get('/:_id', getAdvertById);

router.get('/:page', getPaginatedAdvertisementsList);

router.post('/', createAdvert);

router.put('/:_id', updateAdvertById);

router.delete('/:_id', deleteAdvertById);


module.exports = router;
