const { User } = require('../../models');
const { Conflict } = require('http-errors');

const gravatar = require('gravatar');

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const avatarURL = gravatar.url(email, { s: '100', r: 'x', d: 'retro' }, true);

  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with this email: ${email} already registered`);
  }
  const newUser = new User({ email, password, avatarURL });
  await newUser.save();

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};

module.exports = register;
