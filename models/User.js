'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {type: String, trim: true, required: true},
    email: {type: String, trim: true, required: true, unique: true},
    password: {type: String, required: true},
    // imageAvatar: {type: String, default: 'https://i.pravatar.cc/500'},
    // isAdmin: {type: Boolean, default: false, required: true}
  },
  {
    timestamps: true
  }
);

userSchema.statics.hashPassword = function(passwordHashed){
  return bcrypt.hash(passwordHashed, 7);
}

userSchema.methods.comparePassword = function(passwordHashed){
  return bcrypt.compare(passwordHashed, this.password);
}

//Create model
const User = mongoose.model('User', userSchema);

//Exports model
module.exports = User;
