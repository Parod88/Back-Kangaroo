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
      info: 'An error occurred.',
      message: `${error}`
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
      info: 'An error occurred.',
      message: `${error}`
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
        info: `The record with id: ${advertId} does not exist`
      });
      return;
    }
    //Send response
    res.json({results: advert});
  } catch (error) {
    res.status(500).send({
      info: 'An error occurred while viewing the advertisement.',
      message: `${error}`
    });
    next(error);
  }
};

const createAdvert = async (req, res, next) => {
  try {
    const advertData = req.body;
    const imagesSize = advertData.image.length;

    const advertExist = await AdvertisementModel.exists({name: advertData.name});
    if (advertExist) {
      res.status(404).json({
        info: `There is already an advert with the same name.`
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
      image: advertData.image[imagesSize - 1],
      categories: advertData.categories,
      gallery: [],
      tags: advertData.tags,
      author: advertData.author
    });

    const createdAdvert = await newAdvert.save();
    res.status(201).json({info: 'Advert Created', results: createdAdvert});
  } catch (error) {
    res.status(500).send({
      info: 'An error occurred while creating the advert.',
      message: `${error}`
    });
    next(error);
  }
};

const updateAdvert = async (req, res, next) => {
  console.log('entra', req.body);
  try {
    const advertId = req.params.advertId;
    const advertData = req.body;

    const advert = await AdvertisementModel.findById(advertId);

    const advertUpdateResult = await AdvertisementModel.findByIdAndUpdate(
      {_id: advertId},
      {
        name: advertData.name || advert.name,
        description: advertData.description || advert.description,
        nameEn: advertData.nameEn || advert.nameEn,
        descriptionEn: advertData.descriptionEn || advert.descriptionEn,
        type: advertData.type || advert.type,
        price: advertData.price || advert.price,
        image: advertData.image[0] ? advertData.image[0] : advert.image,
        categories: advertData.categories || advert.image,
        state: advertData.state || advert.state,
        gallery: advertData.gallery ? advertData.gallery : [],
        tags: advertData.tags || advert.tags,
        author: advertData.author
      },
      {new: true} // Return final state
    );

    if (!advertUpdateResult) {
      res.status(404).json({
        info: `The record with id: ${advertId} does not exist`
      });
      return;
    }

    res.status(200).json({
      info: 'Advert Updated',
      results: advertUpdateResult
    });
  } catch (error) {
    res.status(500).send({
      info: 'An error occurred while updating the advert.',
      message: `${error}`
    });
    next(error);
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
      info: 'Advertisement Deleted',
      results: advertDelete
    });
  } catch (err) {
    res.status(500).send({
      info: 'An error occurred while the advertisement was being removed.',
      message: `${error}`
    });
    next(err);
  }
};

const createAdveretReview = async (req, res, next) => {
  try {
    const advertId = req.params.advertId;
    const advert = await AdvertisementModel.findById(advertId);

    if (!advert) {
      res.status(400).json({error: `The record with id: ${advertId} not found.`});
      return;
    }

    if (advert) {
      if (advert.reviews.find((review) => review.author === req.user.author)) {
        res.status(400).json({error: `You already submitted a review for this advert`});
        return;
      }
    }

    //Create review
    const review = {
      author: req.user.name,
      rating: Number(req.body.rating),
      comment: req.body.comment
    };

    //Update data advert
    advert.reviews.push(review);
    advert.reviewCount = advert.reviews.length;
    advert.reviewStart =
      advert.reviews.reduce((a, c) => c.reviewStart + a, 0) / advert.reviews.length;
    const newReviewAdvert = await advert.save();

    //Send responses
    res.status(200).json({
      message: 'Review advert create',
      results: newReviewAdvert.reviews[newReviewAdvert.reviews.length - 1]
    });
  } catch (error) {
    res.status(500).send({
      info: 'Advert Not Found',
      message: `${error}`
    });
    next(error);
  }
};

module.exports = {
  getAdvertisementsList,
  getPaginatedAdvertisementsList,
  getAdvertById,
  createAdvert,
  updateAdvert,
  deleteAdvert,
  createAdveretReview
};
