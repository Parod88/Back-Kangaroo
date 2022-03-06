'use strict';

const User = require('../models/User.js');

const exampleUserMethod = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json({data: users});
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred.'
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
  exampleUserMethod,
  register,
  update,
  deleteUser
};
