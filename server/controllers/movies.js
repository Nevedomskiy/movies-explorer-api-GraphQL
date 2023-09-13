const Movie = require('../models/movie');
const AssertionError = require('../errors/assertion-error');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-error');
const {
  errMessageIncorrectCreateDataMovie,
  errMessageAssertionMovie,
  messageMovieDeleted,
  errMessageMovieNotFound,
} = require('../utils/constants/constants');

const getMovies = (req, res, next) => {
  const userId = req.user._id;
  Movie
    .find({ owner: userId })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie
    .create(
      {
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        nameRU,
        nameEN,
        thumbnail,
        movieId,
        owner,
      },
    )
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(errMessageIncorrectCreateDataMovie));
      } else {
        next(err);
      }
    });
};

const removeMovieById = (req, res, next) => {
  Movie
    .findById(req.params.id)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError(errMessageMovieNotFound));
      } else if (req.user._id !== movie.owner.toString()) {
        next(new AssertionError(errMessageAssertionMovie));
      } else {
        Movie
          .findByIdAndDelete(req.params.id)
          .then(() => { res.status(200).send({ message: messageMovieDeleted }); })
          .catch(next);
      }
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  removeMovieById,
};
