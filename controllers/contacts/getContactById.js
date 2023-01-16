const { Сontact } = require('../../models');
const { HttpError } = require('../../helpers');

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;

  const contactItem = await Сontact.findOne({ _id: contactId, owner: _id });
  if (!contactItem) {
    return next(HttpError(404, `Contact with id:${contactId} not found`));
  }

  res.status(200).json(contactItem);
};

module.exports = getContactById;
