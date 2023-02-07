const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const getCurrentUser = require('./getCurrentUser');
const updateSubscription = require('./updateSubscription');
const updateAvatar = require('./updateAvatar');
const getVerificationUser = require('./getVerificationUser');
const reVerification = require('./reVerification');

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
  getVerificationUser,
  reVerification,
};
