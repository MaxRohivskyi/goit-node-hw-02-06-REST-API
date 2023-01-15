const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'name is required': 'you should provide phone name',
  }),

  phone: Joi.string().min(10).max(12).required().messages({
    'phone number is required': 'you should provide phone number',
  }),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required()
    .messages({
      'email is required': 'you should provide email',
    }),
  favorite: Joi.boolean(),
});

module.exports = {
  contactSchema,
};
