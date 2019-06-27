

const UserModel = require('../services/training/model/user');
const UserController = require('../services/training/controller/UserController');
const UserTransformer= require('../services/training/transformer/UserTransformer');

class user_service {

	static findById(id, callback) {
		UserModel.findById( id, (error, user) => {
			if (error) {
				callback(error);
			} else {
				callback(null, user);
			}
		});
	}
	static findOne(options, callback) {
		UserModel.findOne( options, (error, user) => {
			if (error) {
				callback(error);
			} else {
				callback(null, user);
			}
		});
	}
	static registerSocial(user, done) {
		return UserController.registerSocial(user, done);
	}
	static transform(users) {
		return UserTransformer.transform(users);
	}
}

module.exports = {
	user: user_service,
}
