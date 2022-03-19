'use strict';

const AdvertisementModel = require('../models/Advertisement.js');

const getAdvertisementsList = async (req, res, next) => {
  try {
    const advertisementsList = await AdvertisementModel.find()
      .populate('author')
      .sort({updatedAt: -1});
    res.status(200).json({results: advertisementsList});
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred.'
    });
    next(error);
  }
};

const getPaginatedAdvertisementsList = async (req, res, next) => {
  let perPage = 9;
  let page = req.params.page || 1;
  try {
    const paginatedAdvertisements = await AdvertisementModel.find({})
      .populate('author')
      .sort({updatedAt: -1})
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    res.json({results: paginatedAdvertisements});
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred.'
    });
    next(error);
  }
};

const getAdvertById = async (req, res, next) => {
  try {
    const advertId = req.params.advertId;
    const advert = await AdvertisementModel.findById(advertId);

    //Send no exist id
    if (!advert) {
      res.status(404).json({
        error: `The record with id: ${advertId} does not exist`
      });
      return;
    }
    //Send response
    res.json({results: advert});
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred while viewing the advertisement.'
    });
    next(error);
  }
};

const createAdvert = async (req, res, next) => {
  console.log(req.body);

  try {
    const advertData = req.body;
    const imageData = req.file;

    const advertExist = await AdvertisementModel.exists({name: advertData.name});
    if (advertExist) {
      res.status(404).json({
        error: `There is already an advert with the same name.`
      });
      return;
    }

    const newAdvert = new AdvertisementModel({
      name: advertData.name,
      description: advertData.description,
      nameEn: advertData.nameEn,
      descriptionEn: advertData.descriptionEn,
      type: advertData.type,
      price: advertData.price,
      image: `${imageData.filename}`,
      categories: req.body.categories.split(','),
      gallery: [],
      tags: req.body.tags.split(','),
      author: advertData.author
    });

    const createdAdvert = await newAdvert.save();
    res.status(201).json({message: 'Advert Created', results: createdAdvert});
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred while creating the advert.'
    });
    next(error);
  }
};

const updateAdvert = async (req, res, next) => {
  console.log('body', req.body);
  console.log('advertId', req.params.advertId);
  console.log('file', req.file);

  try {
    const advertId = req.params.advertId;
    const advertData = req.body;
    const imageData = req.file;

    const categoriesList = req.body.categories.split(',');
    const tagsList = req.body.tags.split(',');

    const advertReturn = await AdvertisementModel.findById(advertId);

    const advertUpdateResult = await AdvertisementModel.findByIdAndUpdate(
      {_id: advertId},
      {
        name: advertData.name,
        description: advertData.description,
        nameEn: advertData.nameEn,
        descriptionEn: advertData.descriptionEn,
        type: advertData.type,
        price: advertData.price,
        image: req.file ? req.file.filename : advertReturn.image,
        categories: categoriesList,
        gallery: [],
        tags: tagsList,
        author: advertData.author
      },
      {new: true} // Return final state
    );

    if (!advertUpdateResult) {
      res.status(404).json({
        error: `The record with id: ${advertId} does not exist`
      });
      return;
    }

    res.status(200).json({
      message: 'Advert Updated',
      results: advertUpdateResult
    });
  } catch (err) {
    res.status(500).send({
      message: 'An error occurred while updating the advert.'
    });
    next(err);
  }
};

const deleteAdvert = async (req, res, next) => {
  try {
    const advertId = req.params.advertId;
    const advertDelete = await AdvertisementModel.findByIdAndDelete(advertId);

    if (!advertDelete) {
      res.status(404).json({error: `The record with id: ${advertId} not found.`});
      return;
    }

    res.status(200).json({
      message: 'Advertisement Deleted',
      results: advertDelete
    });
  } catch (err) {
    res.status(500).send({
      message: 'An error occurred while the advertisement was being removed.'
    });
    next(err);
  }
};

module.exports = {
  getAdvertisementsList,
  getPaginatedAdvertisementsList,
  getAdvertById,
  createAdvert,
  updateAdvert,
  deleteAdvert
};
