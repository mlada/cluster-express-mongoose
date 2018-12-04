const { User } = require('./../models');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(
	new LocalStrategy((username, password, done) => {
		User.findOne({ username: username }, (err, user) => {
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
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

const login = (req, res, next) => {
	passport.authenticate('local', function(err, user, info) {
		return err
			? next(err)
			: user
			? req.logIn(user, function(err) {
					return err ? next(err) : res.json(user);
			  })
			: res.send('Not authtorised');
	})(req, res, next);
};

const logout = (req, res) => {
	req.logout();
	res.send('You are logged out');
};

const register = (req, res, next) => {
	const user = new User({ username: req.body.username, password: req.body.password });
	user.save(function(err) {
		return err
			? next(err)
			: req.logIn(user, function(err) {
					return err ? next(err) : res.json(user);
			  });
	});
};

const mustAuthenticatedMw = (req, res, next) => {
	req.isAuthenticated()
		? () => {
				console.log('Authenticated');
				next();
		  }
		: res.send('Not authtorised');
};

module.exports = { login, logout, register, mustAuthenticatedMw };
