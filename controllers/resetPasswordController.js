'use strict';

const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

const forgotPassword = async (req, res, next) => {
  const message = 'Check your email for a link to reset your password';
  let verificationLink;
  let emailStatus = 'OK';
  try {
    const email = req.body.email;
    const user = await UserModel.findOne({email});

    if (!user) {
      res.json({message});
      return;
    }
    const token = jwt.sign({userId: user.id, email: user.email}, process.env.JWT_SECRET, {
      expiresIn: '10m'
    });
    verificationLink = `${process.env.BASE_URL}/api/v1/login/reset-pass/${token}`;
    user.resetToken = token;
  } catch (error) {
    next(error).json({message});
  }

  //TODO SEND EMAIL
  try {
  } catch (error) {
    emailStatus = error;
    return res.status(400).json({message: 'something went wrong'});
  }

  try {
    await user.save(user);
  } catch (error) {
    emailStatus = error;
    return next(error).status(400).json({message: 'Something went wrong'});
  }

  res.json({message, info: emailStatus});
};

const resetPassword = async (req, res, next) => {
  const {newPassword} = req.body;
  const resetToken = req.headers.reset;

  if (!(resetToken && newPassword)) {
    res.status(400).json({message: 'All the fields are required'});
    return;
  }

  let jwtPayload;
  const user = await UserModel.findOne({where: {resetToken}});
  try {
    jwtPayload = jwt.verify(resetToken, process.env.JWT_SECRET_RESET);
  } catch (error) {
    next(error).json({message: 'Something went wrong'});
  }

  UserModel.password = newPassword;

  try {
  } catch (error) {
    return res.status(401).json({message: 'Something went wrong'});
  }
};

module.exports = {
  forgotPassword,
  resetPassword
};
