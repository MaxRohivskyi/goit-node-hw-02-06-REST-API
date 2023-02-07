const { Сontact } = require('../../models');
const { HttpError } = require('../../helpers');

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const { favorite } = req.body;

  const updatedContact = await Сontact.findOneAndUpdate(
    { _id: contactId, owner: _id },
    { favorite },
    {
      new: true,
    }
  );

  if (!updatedContact) {
    return next(HttpError(404, `Contact with id:${contactId} not found`));
  }

  res.status(200).json(updatedContact);
};

module.exports = updateStatusContact;
