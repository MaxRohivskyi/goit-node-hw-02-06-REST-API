const { User } = require('../../models');
const { Conflict } = require('http-errors');
const { v4: uuidv4 } = require('uuid');
const gravatar = require('gravatar');
const { sendGridConfig } = require('../../services');

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const verificationToken = uuidv4('javasquirpt');
  const avatarURL = gravatar.url(email, { s: '100', r: 'x', d: 'retro' }, true);

  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with this email: ${email} already registered`);
  }

  const newUser = new User({ email, password, avatarURL, verificationToken });
  await newUser.save();

  await sendGridConfig(email, verificationToken);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
      verificationToken: newUser.verificationToken,
    },
  });
};

module.exports = register;
