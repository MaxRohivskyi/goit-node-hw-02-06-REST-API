const { Сontact } = require('../../models');
const { HttpError } = require('../../helpers');

const updateContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;

  const updatedContact = await Сontact.findOneAndUpdate(
    { _id: contactId, owner: _id },
    req.body,
    {
      new: true,
    }
  );

  if (!updatedContact) {
    return next(HttpError(404, `Contact with id:${contactId} not found`));
  }

  res.status(200).json(updatedContact);
};

module.exports = updateContactById;
