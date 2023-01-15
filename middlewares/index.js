const { validateBody } = require('./validateBody.middleware');
const { auth } = require('./auth.middleware');

module.exports = {
  validateBody,
  auth,
};
