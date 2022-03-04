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
  deleteUser
};
