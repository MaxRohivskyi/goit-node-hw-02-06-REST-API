const { validateBody } = require('./validateBody.middleware');
const { auth } = require('./auth.middleware');
const { upload } = require('./uploadAvatar.middleware');

module.exports = {
  validateBody,
  auth,
  upload,
};
