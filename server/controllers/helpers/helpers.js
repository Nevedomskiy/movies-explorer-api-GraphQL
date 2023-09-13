const NotFoundError = require('../../errors/not-found-err');
const BadRequestError = require('../../errors/bad-request-error');
const ConflictingRequestError = require('../../errors/conflicting-request-error');

const changeData = (
  out,
  body,
  id,
  res,
  next,
  errMessageUserNotFound,
  errMessageMailIsRegistered,
  errMessageIncorrectUpdateDataUser,
) => {
  out
    .findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      },
    )
    .orFail(new NotFoundError(errMessageUserNotFound))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictingRequestError(errMessageMailIsRegistered));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(errMessageIncorrectUpdateDataUser));
      } else {
        next(err);
      }
    });
};

const getUserData = (out, id, res, next, errMessageUserNotFound) => {
  out
    .findById(id)
    .orFail(new NotFoundError(errMessageUserNotFound))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports = {
  changeData,
  getUserData,
};
