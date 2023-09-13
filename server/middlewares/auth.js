const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');
const errMessageUnauthorized = require('../utils/constants/constants');

const {
  DEV_SECRET, NODE_ENV, JWT_SECRET,
} = require('../utils/config/config');

module.exports = (req, res, next) => {
  const { authorization } = req.cookies;

  if (!authorization) {
    next(new UnauthorizedError(errMessageUnauthorized));
    return;
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET,
    );
  } catch (err) {
    next(new UnauthorizedError(errMessageUnauthorized));
    return;
  }

  req.user = payload;
  next();
};
