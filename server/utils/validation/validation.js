const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const BadRequestError = require('../../errors/bad-request-error');
const errMessageLinkIsNotValid = require('../constants/constants');

const validIsURL = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new BadRequestError(errMessageLinkIsNotValid);
};

const validationAddMovies = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validIsURL),
    trailerLink: Joi.string().required().custom(validIsURL),
    thumbnail: Joi.string().required().custom(validIsURL),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validationRemoveMovies = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
});

const validationPatchUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validationCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
});

module.exports = {
  validationAddMovies,
  validationRemoveMovies,
  validationPatchUser,
  validationLogin,
  validationCreateUser,
};
