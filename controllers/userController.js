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

module.exports = {
  exampleUserMethod,
  register
};
