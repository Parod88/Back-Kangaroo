'use strict';

const UserModel = require('../models/User.js');

const exampleUserMethod = async (req, res, next) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json({data: users});
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred.'
    });
    next(err);
  }
};

const updateUser = async (req, res, next) =>{
  try {}catch(error) {
    res.status(400).json({
      info: 'User update process failed',
      message: `${error}`


    });
  }
}

module.exports = {
  exampleUserMethod,
  updateUser
};
