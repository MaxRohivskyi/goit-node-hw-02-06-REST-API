const { Сontact } = require('../../models');

const getContacts = async (req, res, next) => {
  const { _id } = req.user;
  const { page, limit, favorite } = req.query;
  const limitCondition = parseInt(limit) > 5 ? 5 : parseInt(limit);
  const skip = parseInt(page - 1) * parseInt(limitCondition);
  const contactsList = await Сontact
    .find(
      favorite ? { owner: _id, favorite } : { owner: _id },
      '-createdAt -updatedAt'
    )
    .skip(skip)
    .limit(limitCondition);

  res.status(200).json(contactsList);
};

module.exports = getContacts;
