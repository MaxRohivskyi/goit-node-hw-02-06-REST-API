const { User } = require('../../models');
const { Unauthorized } = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const { JWT_SECRET } = process.env;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized(`User with this ${email} does not exists`);
  }
  const isPasswordTheSame = await bcrypt.compare(password, user.password);
  if (!isPasswordTheSame) {
    throw new Unauthorized('Wrong password, try again');
  }

  const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
    expiresIn: '30m',
  });

  user.token = token;
  await User.findByIdAndUpdate(user._id, user);

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
