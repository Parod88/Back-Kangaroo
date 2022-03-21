const bcrypt = require('bcryptjs');

const data = {
  users: [
    {
      name: 'WallacloneAdmin',
      email: 'admin@kangaroo.com',
      password: bcrypt.hashSync('123456'),
      imageAvatar: 'https://i.pravatar.cc/500',
      userToken: '',
      followers: [],
      followings: [],
      vendors: [],
      active: true
    },
    {
      name: 'WallacloneAdvertiser',
      email: 'advertiser@kangaroo.com',
      password: bcrypt.hashSync('123456'),
      imageAvatar: 'https://i.pravatar.cc/500',
      userToken: '',
      followers: [],
      followings: [],
      vendors: [],
      active: true
    },
    {
      name: 'WallacloneUser',
      email: 'user@kangaroo.com',
      password: bcrypt.hashSync('123456'),
      imageAvatar: 'https://i.pravatar.cc/500',
      userToken: '',
      followers: [],
      followings: [],
      vendors: [],
      active: true
    },
    {
      name: 'WallacloneUser2',
      email: 'kangaroomailer@gmail.com',
      password: bcrypt.hashSync('123456'),
      imageAvatar: 'https://i.pravatar.cc/500',
      userToken: '',
      followers: [],
      followings: [],
      vendors: [],
      active: true
    }
  ]
};
module.exports = data;
