'use strict';

//Import mongoose module
const mongoose = require('mongoose');

//Definition the schema of review
const reviewSchema = mongoose.Schema(
  {
    author: {type: mongoose.Schema.Types.ObjectID, ref: 'User'},
    comment: {type: String, required: true},
    rating: {type: Number, required: true, unique: true}
  },
  {timestamps: true}
);

//Definition the schema of advertisement
const advertisementSchema = mongoose.Schema(
  {
    name: {type: String, maxLength: 100, required: true, index: true},
    nameEn: {type: String, maxLength: 100, required: true, index: true},
    description: {type: String, maxLength: 1000, required: true},
    descriptionEn: {type: String, maxLength: 1000, required: true},
    type: {
      type: String,
      enum: ['Sale', 'Purchase'],
      default: 'Sale'
    },
    price: {type: Number, required: true},
    image: {type: String, maxLength: 500},
    categories: [{type: mongoose.Schema.Types.ObjectID, ref: 'Category'}],
    gallery: [],
    tags: {type: [String], default: ['uncategorized']},
    author: {type: mongoose.Schema.Types.ObjectID, ref: 'User'},
    state: {
      type: String,
      enum: ['ForSale', 'Inactive', 'Finished'],
      default: 'ForSale'
    },
    reviews: [reviewSchema]
  },
  {timestamps: true}
);

// Create the model
const Advertisement = mongoose.model('Advertisement', advertisementSchema);

// Export model
module.exports = Advertisement;
