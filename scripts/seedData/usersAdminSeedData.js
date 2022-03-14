const bcrypt = require('bcryptjs');

const data = {
  users: [
    {
      name: 'WallacloneAdmin',
      email: 'admin@wallaclone.com',
      password: bcrypt.hashSync('123456'),
      imageAvatar: 'https://i.pravatar.cc/500',
      isAdmin: true,
      active: true
    },
    {
      name: 'WallacloneAdvertiser',
      email: 'advertiser@wallaclone.com',
      password: bcrypt.hashSync('123456'),
      imageAvatar: 'https://i.pravatar.cc/500',
      isAdmin: true,
      active: true
    },
    {
      name: 'WallacloneUser',
      email: 'user@wallaclone.com',
      password: bcrypt.hashSync('123456'),
      imageAvatar: 'https://i.pravatar.cc/500',
      isAdmin: true,
      active: true
    },
    {
      name: 'WallacloneUser2',
      email: 'kangaroomailer@gmail.com',
      password: bcrypt.hashSync('123456'),
      imageAvatar: 'https://i.pravatar.cc/500',
      isAdmin: true,
      active: true
    }
  ]
};
module.exports = data;
