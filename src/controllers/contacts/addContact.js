const { Сontact } = require('../../models');
const { HttpError } = require('../../helpers');

const addContact = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;
  const { _id } = req.user;

  const newContact = await Сontact.create({
    name,
    email,
    phone,
    favorite,
    owner: _id,
  });

  if (!newContact) {
    return next(HttpError(404, `Contact missing required field`));
  }

  res.status(201).json(newContact);
};

module.exports = addContact;
