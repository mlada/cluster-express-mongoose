require('dotenv').config();
const express = require('express');
const { formBP, jsonBP, static, cookieParser, sessionConfig } = require('./config');
const app = express();
const router = express.Router();

// подключаем swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const options = {
	swaggerUrl: '/v2/swagger.json'
};
// const router = require('../controllers');
const errorHandler = require('./helpers/errorHandler');
// все настройки для удобства вынесла в отдельный модуль

const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');

app
	.use(static)
	.use(cookieParser)
	.use(sessionConfig)
	.use(jsonBP)
	.use(formBP);

// используем для доступа к нему отдельный роут
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

const passport = require('passport');

router.use(passport.initialize());
router.use(passport.session());
const { user, auth } = require('../controllers/index');

app.use('/private', auth.mustAuthenticatedMw);

// подключаем роутинг
router
	.route('/users')
	.post(user.createUser)
	.get(user.getAllUsers);

router
	.route('/users/:userId')
	.get(user.getOneUser)
	.put(user.updateUser)
	.delete(user.deleteUser);

router.route('/login').post(auth.login);
router.route('/logout').post(auth.logout);
router.route('/register').post(auth.register);

router.param('userId', user.getByIdUser);

app.use('/api', router);
// обработчик вызывается непосредственно перед запуском сервера
app.use(errorHandler);

app.listen(process.env.PORT, err => {
	if (err) console.error(err);
	else console.log(`Running server at port ${process.env.PORT}!`);
});
