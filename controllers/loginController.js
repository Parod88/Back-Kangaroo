'use strict';

const jwt = require('jsonwebtoken');

const UserModel = require('../models/User.js');

const login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({email: email});

    if (!user || !(await user.comparePassword(password))) {
      res.json({error: 'User not found'});
      return;
    }

    jwt.sign(
      {_id: user._id},
      process.env.JWT_SECRET,
      {
        expiresIn: '10d'
      },
      (err, jwtToken) => {
        if (err) {
          next(err);
          return;
        }
        res.json({token: jwtToken});
      }
    );
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login
};
