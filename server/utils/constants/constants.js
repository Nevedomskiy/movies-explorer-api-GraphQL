// сообщения ошибок
const errMessageMailIsRegistered = 'Данная почта уже зарегистрирована';
const errMessageIncorrectCreateDataUser = 'Переданы некорректные данные при создании пользователя.';
const errMessageIncorrectUpdateDataUser = 'Переданы некорректные данные при обновлении профиля.';
const errMessageIncorrectCreateDataMovie = 'Переданы некорректные данные при создании фильма.';
const errMessageMovieNotFound = 'Фильм не найден';
const errMessageAssertionMovie = 'Попытка удалить чужой фильм';
const errMessageUserNotFound = 'Пользователь не найден';
const errMessageLinkIsNotValid = 'Ссылка невалидна';
const errMessageIncorrectMailOrPassword = 'Неправильные почта или пароль';
const errMessageUnauthorized = 'Необходима авторизация';
const errMessageBadUrl = 'Маршрут указан некорректно';
const errMessageServerProblem = 'На сервере произошла ошибка';
const errMessageServerCrack = 'Сервер сейчас упадёт';

// сообщения ответов
const messageSuccessfulLogin = 'Успешный вход';
const messageSuccessfulExit = 'Успешный выход';
const messageMovieDeleted = 'Фильм удален';

module.exports = {
  errMessageMailIsRegistered,
  errMessageLinkIsNotValid,
  errMessageIncorrectMailOrPassword,
  errMessageIncorrectCreateDataUser,
  errMessageIncorrectUpdateDataUser,
  errMessageIncorrectCreateDataMovie,
  errMessageMovieNotFound,
  errMessageAssertionMovie,
  errMessageUserNotFound,
  errMessageUnauthorized,
  errMessageBadUrl,
  errMessageServerProblem,
  errMessageServerCrack,
  messageSuccessfulLogin,
  messageSuccessfulExit,
  messageMovieDeleted,
};
