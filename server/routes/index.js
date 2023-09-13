const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  validationLogin,
  validationCreateUser,
} = require('../utils/validation/validation');
const userRoutes = require('./users');
const moviesRoutes = require('./movies');
const { logOut } = require('../controllers/users');
const errorBadUrl = require('../middlewares/errorBadUrl');

const {
  login,
  createUser,
} = require('../controllers/users');

router.post(
  '/signin',
  validationLogin,
  login,
);
router.post(
  '/signup',
  validationCreateUser,
  createUser,
);

router.use(auth);

router.post('/signout', logOut);

router.use('/users', userRoutes);

router.use('/movies', moviesRoutes);

// обработка ошибки с неправильным адресом запроса
router.use(errorBadUrl);

module.exports = router;
