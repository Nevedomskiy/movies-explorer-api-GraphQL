const express = require('express');
require('dotenv').config();
const { createHandler } = require('graphql-http/lib/use/express');
const expressPlayground = require('graphql-playground-middleware-express').default;
// eslint-disable-next-line no-unused-vars
const colors = require('colors');

const connectDB = require('./config/db');
const schema = require('./schema/schema');

const port = process.env.PORT || 5000;
const app = express();

// подключаем базу данных
connectDB();

app.all('/graphql', createHandler({ schema }));
app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

app.listen(port, () => console.log(`Server is running on PORT ${port}...`));
// require('dotenv').config();
// const helmet = require('helmet');
// const express = require('express');

// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const { errors } = require('celebrate');
// const { requestLogger, errorLogger } = require('./middlewares/logger');
// const errorHandler = require('./middlewares/errorHandler');
// const corsOptions = require('./middlewares/corsOptions');
// const routes = require('./routes/index');
// const limiterOptions = require('./middlewares/limiterOptions');

// const { errMessageServerCrack } = require('./utils/constants/constants');

// const app = express();

// // логирование запросов
// app.use(requestLogger);

// // блокировка множественных запросов(от DoS-атак)
// app.use(limiterOptions);

// // защита express(шифрование заголовков)
// app.use(helmet());

// // парсинг кук
// app.use(cookieParser());

// // преобразование ответа в формат json
// app.use(express.json());

// // проверка тела запроса
// app.use(bodyParser.json());

// // поддержка анализа данных запроса
// app.use(bodyParser.urlencoded({ extended: true }));

// // подключение cors(защита от посторонних запросов)
// app.use(corsOptions);

// // проверка работоспособности pm2 на сервере(поднимает сервер после ошибки)
// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error(errMessageServerCrack);
//   }, 0);
// });

// // обработка запросов
// app.use(routes);

// // обработка ошибок celebrate
// app.use(errors());

// // логирование ошибок
// app.use(errorLogger);

// // конечная обработка ошибок
// app.use(errorHandler);

// app.listen(PORT);
