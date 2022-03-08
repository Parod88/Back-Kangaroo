'use strict';

const AdvertisementModel = require('../models/Advertisement.js');

//CRUD

// GET/api/v1/advertisements
const getAdvertisementsList = async (req, res, next) => {
  try {
    const advertisementsList = await AdvertisementModel.find().sort({updatedAt: -1});
    res.status(200).json({advertisementsList});
    // res.status(302).redirect('/api/v1/advertisements/1');
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
      .sort({updatedAt: -1})
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    res.json({data: paginatedAdvertisements});
  } catch (error) {
    next(error);
  }
};

const createAdvert = async (req, res, next) => {
  try{
    const {name, description, sale, price, image, gallery, tags, author} = req.body;
    const newAdvertisement = new AdvertisementModel({name, description, sale, price, image, gallery, tags, author});
    const advertSaved= await newAdvertisement.save();
    res.status(201).json(advertSaved);
  } catch(error){
    next(error);
  } 
};

const getAdvertById = async (req, res, next) => {
try{
  const advert = await AdvertisementModel.findById(req.params._id);
  res.status(200).json(advert)
} catch(error){
  next(error);
} 
};


const updateAdvertById = async (req, res, next) => {
try{
  const updateAdvert = await AdvertisementModel.findByIdAndUpdate(req.params._id, req.body, {
    new: true,
  })
  res.status(200).json(updateAdvert);
} catch(error){
  next(error);
} 
};

const deleteAdvertById = async (req, res, next) => {
try{
  await AdvertisementModel.findByIdAndDelete(req.params._id);
  res.status(204).json();
} catch(error){
  next(error);
}  
// GET/api/v1/advertisements/:id
const getAdvertById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const singleAdvert = await AdvertisementModel.findById(id);
    res.json({data: singleAdvert});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAdvertisementsList,
  getPaginatedAdvertisementsList,
  getAdvertById,
  createAdvert,
  updateAdvertById,
  deleteAdvertById,
  getAdvertById,
};
