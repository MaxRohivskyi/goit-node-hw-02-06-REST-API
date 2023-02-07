const { User } = require('../../models');
const { NotFound, BadRequest } = require('http-errors');
const { sendGridConfig } = require('../../services');

const reVerification = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    throw new NotFound(`No user with this ${email} where found`);
  }

  const { verificationToken, verify } = user;

  if (verify) {
    throw new BadRequest(`User with this email: ${email} already verify`);
  }

  await sendGridConfig(email, verificationToken);

  res.status(200).json({
    status: `Verification email sent`,
  });
};

module.exports = reVerification;
