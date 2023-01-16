const { User } = require('../../models');
const { Conflict } = require('http-errors');

const register = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with this email: ${email} already registered`);
  }
  const newUser = new User({ email, password });
  await newUser.save();

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = register;
