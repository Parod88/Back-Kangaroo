'use strict';

const express = require('express');
const router = express.Router();
const {
  getAdvertisementsList,
  getPaginatedAdvertisementsList,
  getAdvertById,
  createAdvert,
  updateAdvert,
  deleteAdvert
} = require('../../../controllers/advertisementController.js');

// Routes
router.get('/', getAdvertisementsList);
router.get('/:p&:page', getPaginatedAdvertisementsList);
router.get('/:advertId', getAdvertById);
router.post('/', createAdvert);
router.put('/:advertId', updateAdvert);
router.delete('/:advertId', deleteAdvert);

module.exports = router;
