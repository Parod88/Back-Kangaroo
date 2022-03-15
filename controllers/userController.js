'use strict';

const User = require('../models/User.js');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json({results: users});
  } catch (err) {
    res.status(500).send({
      message: 'An error occurred while consulting the list of users.'
    });
    next(err);
  }
};

const getOneUserForId = async (req, res, next) => {
  try {
    const _id = req.params.userId;
    const user = await User.findById({_id});
    if (!user) {
      res.status(404).json({
        error: `The record with id: ${_id} does not exist`
      });
    } else {
      res.status(200).json({results: user});
    }
  } catch (err) {
    res.status(500).send({
      message: 'An error occurred while return de users.'
    });
    next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const {name, email, password} = req.body;

    const hashedPassword = await User.hashPassword(password);
    const newUser = new User({name, email, password: hashedPassword});

    res.status(201).json(await newUser.save());
  } catch (error) {
    res.status(418).json({
      info: 'User creation process failed',
      message: `${error}`
    });
  }
};

const update = async (req, res, next) => {
  try {
    const _id = req.params.userId;
    const data = req.body;
    const updatedUser = await User.findOneAndUpdate({_id}, data, {
      new: true
    });

    if (!updatedUser) {
      res.status(404).json({
        info: 'User ID not found.'
      });
      return;
    }

    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(400).json({
      info: 'User update process failed',
      message: `${error}`
    });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const _id = req.params.userId;

    const {deletedCount} = await User.deleteOne({_id});

    if (!deletedCount === 0) {
      res.status(404).json({
        info: 'User ID not found.'
      });
      return;
    }

    res.status(200).json({info: 'deleted'});
  } catch (error) {
    res.status(400).json({
      info: 'User delete process failed',
      message: `${error}`
    });
  }
};

module.exports = {
  getAllUsers,
  getOneUserForId,
  register,
  update,
  deleteUser
};
