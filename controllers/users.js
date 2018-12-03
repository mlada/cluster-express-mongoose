const { User } = require('../models');

const createUser = function(req, res, next) {
	const user = new User(req.body);

	user.save(function(err) {
		if (err) {
			next(err);
		} else {
			res.json(user);
		}
	});
};
const getAllUsers = (req, res, next) => {
	User.find((err, users) => {
		if (err) {
			next(err);
		} else {
			res.json(users);
		}
	});
};

const getByIdUser = function(req, res, next, id) {
	User.findOne({ _id: id }, function(err, user) {
		if (err) {
			next(err);
		} else {
			req.user = user;
			next();
		}
	});
};

module.exports = {
	getAllUsers,
	createUser,
	getByIdUser
};
