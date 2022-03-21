'use strict';

//Import modules
const faker = require('faker/locale/es');
const fs = require('fs');
var util = require('util');

//Import models
const AdvertisementModel = require('../models/Advertisement.js');
const UserModel = require('../models/User.js');

//Execute general function script
seedLoadData().catch((err) => console.log('There was an error', err));

async function seedLoadData() {
  await generateSeedUsersData();
  await createSeedAdvertisementData();
}

//================================================================
//Create mock users in database
//================================================================
async function generateSeedUsersData() {
  console.log('Success: Users control role create manual in UsersAdminSeedData file.');
}

//================================================================
//Create mock experiences in database
//================================================================
async function createSeedAdvertisementData() {
  var advertisement = [];

  for (let id = 1; id <= 10; id++) {
    advertisement.push({
      name: faker.commerce.productName(),
      nameEn: faker.commerce.productName(),
      description: faker.lorem.paragraph(),
      descriptionEn: faker.lorem.paragraph(),
      type: 'Sale',
      price: faker.datatype.number(3, 150),
      image: faker.image.imageUrl(),
      categories: [],
      gallery: [
        faker.image.sports(1500, 1500),
        faker.image.sports(1500, 1500),
        faker.image.sports(1500, 1500),
        faker.image.sports(1500, 1500)
      ],
      tags: ['tag1', 'tag2'],
      author: '',
      state: 'ForSale'
    });
  }

  fs.writeFileSync(
    './scripts/seedData/advertisementSeedData.js',
    `const data = { advertisements: 
      ${util.inspect(advertisement)}
    }; module.exports=data;`,
    'utf-8'
  );

  console.log('Success: advertisements seed data file generated in seedData directory.');
}
