const routerUser = require('express').Router();

const {
  validationPatchUser,
} = require('../utils/validation/validation');

const {
  getUserInfo,
  changeUserInfo,
} = require('../controllers/users');

routerUser.get('/me', getUserInfo);

routerUser.patch(
  '/me',
  validationPatchUser,
  changeUserInfo,
);

module.exports = routerUser;
