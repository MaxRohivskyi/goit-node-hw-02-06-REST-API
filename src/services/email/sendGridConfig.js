const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sendGridConfig = (email, verificationToken) => {
  const PORT = process.env.PORT;
  const SENDGRID_EMAIL = process.env.SENDGRID_EMAIL;
  const msg = {
    to: email,
    from: SENDGRID_EMAIL,
    subject: 'Registration verefication',
    html: `<b>To verify your registration tap at this <a href="http://localhost:${PORT}/api/users/verify/${verificationToken}">link</a></b>`,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch(error => {
      console.error(error);
    });
};

module.exports = {
  sendGridConfig,
};
