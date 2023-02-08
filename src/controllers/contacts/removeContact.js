const { Сontact } = require('../../models');
const { HttpError } = require('../../helpers');

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;

  const contactItem = await Сontact.findById(contactId);

  if (!contactItem) {
    return next(HttpError(404, `Contact with id:${contactId} not found`));
  }

  await Сontact.findByIdAndRemove({ _id: contactId, owner: _id });

  res.status(200).json(contactItem);
};

module.exports = removeContact;
