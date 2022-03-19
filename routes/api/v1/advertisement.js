'use strict';

const express = require('express');
const multerUploadFile = require('../../../middlewares/multerConfigure');
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
router.post('/', multerUploadFile, createAdvert);
router.put('/:advertId', multerUploadFile, updateAdvert);
router.delete('/:advertId', deleteAdvert);

module.exports = router;
