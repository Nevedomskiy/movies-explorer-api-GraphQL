const routerMovies = require('express').Router();

const {
  validationAddMovies,
  validationRemoveMovies,
} = require('../utils/validation/validation');

const {
  getMovies,
  createMovie,
  removeMovieById,
} = require('../controllers/movies');

routerMovies.get('/', getMovies);

routerMovies.post(
  '/',
  validationAddMovies,
  createMovie,
);

routerMovies.delete(
  '/:id',
  validationRemoveMovies,
  removeMovieById,
);

module.exports = routerMovies;
