const { User } = require('../../models');
const { NotFound } = require('http-errors');

const getVerificationUser = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOneAndUpdate(
    { verificationToken: verificationToken },
    {
      $set: {
        verify: true,
        verificationToken: null,
      },
    },
    { new: true }
  );
  if (!user) {
    throw new NotFound(
      `No user with verificationToken ${verificationToken} where found`
    );
  }

  res.status(200).json({
    status: `Your email are verified`,
  });
};

module.exports = getVerificationUser;
