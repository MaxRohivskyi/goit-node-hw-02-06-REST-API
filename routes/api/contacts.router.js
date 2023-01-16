const express = require('express');
const { tryCatchWrapper } = require('../../helpers');
const { validateBody } = require('../../middlewares');
const { contactSchema } = require('../../schemas');
const { auth } = require('../../middlewares');
const { contactsControllers } = require('../../controllers');

const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContactById,
  updateStatusContact,
} = contactsControllers;

const router = express.Router();

router.use(tryCatchWrapper(auth));

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
