const getContacts = require('./getContacts');
const getContactById = require('./getContactById');
const removeContact = require('./removeContact');
const addContact = require('./addContact');
const updateContactById = require('./updateContactById');
const updateStatusContact = require('./updateStatusContact');

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
  updateStatusContact,
};
