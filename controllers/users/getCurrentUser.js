const { User } = require('../../models');
const { Unauthorized } = require('http-errors');

const getCurrentUser = async (req, res, next) => {
  const { _id } = req.user;

  const currentUser = await User.findById(_id);
  if (!currentUser) {
    throw new Unauthorized(`User with this ${_id} does not found`);
  }

  const { email, subscription } = currentUser;

  res.status(200).json({
    email: `${email}`,
    subscription: `${subscription}`,
  });
};

module.exports = getCurrentUser;
