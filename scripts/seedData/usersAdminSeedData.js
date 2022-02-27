const bcrypt = require('bcryptjs');

const data = {
  users: [
    {
      firstName: 'WallacloneAdmin',
      lastName: 'Administrator',
      email: 'admin@wallaclone.com',
      password: bcrypt.hashSync('123456'),
      imageAvatar: 'https://i.pravatar.cc/500',
      isAdmin: true,
      isAdvertiser: true
    },
    {
      firstName: 'WallacloneAdvertiser',
      lastName: 'Advertiser',
      email: 'advertiser@wallaclone.com',
      password: bcrypt.hashSync('123456'),
      imageAvatar: 'https://i.pravatar.cc/500',
      isAdmin: true,
      isAdvertiser: true
    },
    {
      firstName: 'WallacloneUser',
      lastName: 'User',
      email: 'user@wallaclone.com',
      password: bcrypt.hashSync('123456'),
      imageAvatar: 'https://i.pravatar.cc/500',
      isAdmin: true,
      isAdvertiser: true
    }
  ]
};
module.exports = data;
