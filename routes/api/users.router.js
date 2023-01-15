const express = require('express');
const { tryCatchWrapper } = require('../../helpers');
const { validateBody } = require('../../middlewares');
const { userSchema } = require('../../schemas');
const { auth } = require('../../middlewares');
const { usersControllers } = require('../../controllers');

const { register, login, logout, getCurrentUser, updateSubscription } =
  usersControllers;

const router = express.Router();

router.post('/register', validateBody(userSchema), tryCatchWrapper(register));

router.post('/login', validateBody(userSchema), tryCatchWrapper(login));

router.post('/logout', tryCatchWrapper(auth), tryCatchWrapper(logout));

router.get('/current', tryCatchWrapper(auth), tryCatchWrapper(getCurrentUser));

router.patch('/', tryCatchWrapper(auth), tryCatchWrapper(updateSubscription));

module.exports = router;
