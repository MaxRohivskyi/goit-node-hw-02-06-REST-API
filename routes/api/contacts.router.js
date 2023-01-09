const express = require('express');
const { tryCatchWrapper } = require('../../helpers');
const {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
  updateStatusContact,
} = require('../../controllers/contacts.controller');
const { validateBody } = require('../../middlewares');
const { contactSchema } = require('../../schemas');
const router = express.Router();

router.get('/', tryCatchWrapper(getContacts));

router.get('/:contactId', tryCatchWrapper(getContactById));

router.post('/', validateBody(contactSchema), tryCatchWrapper(addContact));

router.delete('/:contactId', tryCatchWrapper(removeContact));

router.put(
  '/:contactId',
  validateBody(contactSchema),
  tryCatchWrapper(updateContactById)
);

router.patch('/:contactId/favorite', tryCatchWrapper(updateStatusContact));

module.exports = router;
