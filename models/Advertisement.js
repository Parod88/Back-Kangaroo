'use strict';

//Import mongoose module
const mongoose = require('mongoose');

//Definition the schema of advertisement
const advertisementSchema = mongoose.Schema(
  {
    title: {type: String, maxLength: 100, required: true, index: true}
    //TODO: COMPLETE MODEL
  },
  {timestamps: true}
);

// Create the model
const Advertisement = mongoose.model('Advertisement', advertisementSchema);

// Export model
module.exports = Advertisement;
