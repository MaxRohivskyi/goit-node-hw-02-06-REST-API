const Joi = require('joi');

const userSchema = Joi.object({
  password: Joi.string().min(5).max(15),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  subscription: Joi.string().valid('starter', 'business', 'pro'),
});

module.exports = {
  userSchema,
};
