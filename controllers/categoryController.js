'use strict';

const CategoryModel = require('../models/Category.js');

const getCategoriesList = async (req, res, next) => {
  try {
    const categoriesList = await CategoryModel.find();
    res.status(200).json({results: categoriesList});
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred.'
    });
    res.status(500).send({
      message: 'An error occurred while consulting the list of categories.'
    });
  }
};

const getCategoryForId = async (req, res, next) => {
  const categoryId = req.params.categoryId;
  try {
    const category = await CategoryModel.find({categoryId});
    if (!category) {
      res.status(404).json({
        error: `The record with id: ${categoryId} does not exist`
      });
      return;
    }
    res.json({results: category});
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred while viewing the category.'
    });
  }
};

const createCategory = async (req, res, next) => {
  console.log('Req', req.body);

  try {
    const categoryData = req.body;

    const categoryExist = await CategoryModel.exists({name: categoryData.name});
    if (categoryExist) {
      res.status(404).json({
        error: `There is already an category with the same name.`
      });
      return;
    }

    const category = new CategoryModel({
      name: categoryData.name,
      image: categoryData.image,
      icon: categoryData.icon
    });
    const createdCategory = await category.save();

    res.status(201).json({message: 'Category Created', results: createdCategory});
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred while creating the category.'
    });
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const categoryData = req.body;

    const categoryUpdateResult = await CategoryModel.findByIdAndUpdate(
      {_id: categoryId},
      categoryData,
      {new: true} // Return final state
    );

    if (!categoryUpdateResult) {
      res.status(404).json({
        error: `The record with id: ${categoryId} does not exist`
      });
      return;
    }

    res.status(200).json({
      message: 'Category Updated',
      results: categoryUpdateResult
    });
  } catch (err) {
    res.status(500).send({
      message: 'An error occurred while updating the category.'
    });
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const categoryDelete = await CategoryModel.findByIdAndDelete(categoryId);

    if (!categoryDelete) {
      res.status(404).json({error: `The record with id: ${categoryId} not found.`});
      return;
    }

    res.status(200).json({
      message: 'Category Deleted',
      results: categoryDelete
    });
  } catch (err) {
    res.status(500).send({
      message: 'An error occurred while the category was being removed.'
    });
    next(err);
  }
};

module.exports = {
  getCategoriesList,
  getCategoryForId,
  createCategory,
  updateCategory,
  deleteCategory
};
