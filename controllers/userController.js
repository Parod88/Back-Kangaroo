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
    const {name, email, password, isAdmin} = req.body;

    const hashedPassword = await User.hashPassword(password);

    const newUser = new User({name, email, hashedPassword});
    await newUser.save();

    res.status(201).json({newUser});
  } catch (error) {
    res.status(418).send({
      message: 'Error in user creation process.'
    });
    next(error);
  }
};

module.exports = {
  exampleUserMethod,
  register
};
