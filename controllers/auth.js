const router = new (require('express')).Router();

const models = require('./../models');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

router.use(passport.initialize());
router.use(passport.session());

passport.use(
	new LocalStrategy((username, password, done) => {
		models.User.findOne({ username: username }, (err, user) => {
			console.log(user);
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, { message: 'Incorrect username.' });
			}
			if (user.password != password) {
				return done(null, false, { message: 'Incorrect password.' });
			}
			return done(null, user);
		});
	})
);

passport.serializeUser(function(user, done) {
	done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	models.User.findById(id, function(err, user) {
		done(err, user);
	});
});

router.post(
	'/',
	passport.authenticate('local', {
		successRedirect: '/cabinet',
		failureRedirect: '/login'
	})
);

router.get('/', function(req, res, next) {
	if (!req.user) {
		req.message = 'not logged';
	}
	res.render('login', { locals: { user: req.user, message: req.message } });
});

router.get('/all', async (req, res, next) => {
	const users = await models.User.find();
	res.send(users);
});

module.exports = router;
