const NotFoundError = require('../errors/not-found-err');
const { errMessageBadUrl } = require('../utils/constants/constants');

module.exports = () => {
  throw new NotFoundError(errMessageBadUrl);
};
