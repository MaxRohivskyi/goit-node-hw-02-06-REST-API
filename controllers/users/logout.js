const { User } = require('../../models');
const { Unauthorized } = require('http-errors');

const logout = async (req, res, next) => {
  const { _id } = req.user;

  const user = await User.findByIdAndUpdate(_id, { token: null });
  if (!user) {
    throw new Unauthorized(`User with this ${_id} does not found`);
  }

  res.status(204).json({
    status: 'No Content',
  });
};

module.exports = logout;
