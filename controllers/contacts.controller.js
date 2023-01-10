const { Сontact } = require('../models/contacts.model');
const { HttpError } = require('../helpers/index');

const getContacts = async (req, res, next) => {
  const contactsList = await Сontact.find();
  res.json(contactsList);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contactItem = await Сontact.findById(contactId);

  if (!contactItem) {
    return next(HttpError(404, `Contact with id:${contactId} not found`));
  }
  return res.json(contactItem);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contactItem = await Сontact.findById(contactId);

  if (!contactItem) {
    return next(HttpError(404, `Contact with id:${contactId} not found`));
  }
  await Сontact.findByIdAndRemove(contactId);
  return res.status(200).json(contactItem);
};

const addContact = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;

  const newContact = await Сontact.create({ name, email, phone, favorite });
  res.status(201).json(newContact);
};

const updateContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await Сontact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!updatedContact) {
    return next(HttpError(404, `Contact with id:${contactId} not found`));
  } else {
    res.status(200).json(updatedContact);
  }
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const updatedContact = await Сontact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );

  if (!updatedContact) {
    return next(HttpError(404, `Contact with id:${contactId} not found`));
  } else {
    res.status(200).json(updatedContact);
  }
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
  updateStatusContact,
};
