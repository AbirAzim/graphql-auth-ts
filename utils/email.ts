const nodemailer = require('nodemailer');

export default async (options) => {
  // 1. create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_HOST,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // 2. options
  const mailOptions = {
    from: 'abir azim <badhon@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3. send email
  await transporter.sendMail(mailOptions);
};