'use strict';
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.email',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.MAILER_ACCOUNT, // generated ethereal user
    pass: process.env.MAILER_PASSWORD // generated ethereal password
  }
});
