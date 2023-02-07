const { User } = require('../../models');
const { Unauthorized } = require('http-errors');

const updateSubscription = async (req, res, next) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const user = await User.findByIdAndUpdate(
    _id,
    { subscription },
    {
      new: true,
    }
  );

  if (!user) {
    throw new Unauthorized(`User with this ${_id} does not found`);
  }

  res.status(200).json(user);
};

module.exports = updateSubscription;
