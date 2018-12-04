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

const getOneUser = function(req, res) {
	res.json(req.user);
};

const updateUser = function(req, res, next) {
	User.findOneAndUpdate(req.body._id, req.body, { new: true }, function(err, user) {
		if (err) {
			next(err);
		} else {
			res.json(user);
		}
	});
};

const deleteUser = function(req, res, next) {
	req.user.remove(function(err) {
		if (err) {
			next(err);
		} else {
			res.json(req.user);
		}
	});
};
module.exports = {
	getAllUsers,
	createUser,
	getByIdUser,
	getOneUser,
	updateUser,
	deleteUser
};
