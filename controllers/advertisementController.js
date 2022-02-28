'use strict';

const AdvertisementModel = require('../models/Advertisement.js');

// const exampleAdvertisementMethod = async (req, res, next) => {
//   try {
//     const advertisements = await AdvertisementModel.find({});
//     res.status(200).json({data: advertisements});
//   } catch (error) {
//     res.status(500).send({
//       message: 'An error occurred.'
//     });
//     next(err);
//   }
// };

//CRUD

// GET/api/v1/anuncios
const getAdvertisementsList = async (req, res, next) => {
  try {
    const advertisementsList = await AdvertisementModel.find().sort({updatedAt: -1});
    res.status(200).json({data: advertisementsList});
  } catch (error) {
    // res.status(500).send({
    //   message: 'An error occurred.'
    // });
    next(error);
  }
};

const getPaginatedAdvertisementsList = async (req, res, next) => {
  let perPage = 9;
  let page = req.params.page || 1;
  try {
    const paginatedAdvertisements = await AdvertisementModel.find({})
      .skip(perPage * page - perPage)
      .limit(perPage)
      .sort({updatedAt: -1})
      .exec();
    res.json({data: paginatedAdvertisements});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAdvertisementsList,
  getPaginatedAdvertisementsList
};
