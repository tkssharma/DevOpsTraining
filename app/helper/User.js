

const bcrypt = require ('bcrypt-nodejs');
const server_config = require ( '../config/server');
const frontend_config = require ( '../config/frontend');
const jwt = require ( 'jsonwebtoken');
const Helper = require ('./index');

class UserHelper {

  static resource(path) {
      return `${server_config.HOST}${server_config.PORT ? `:${server_config.PORT}` : ''}${path}`;
	}

	static hash_password( password ) {
		let salt = bcrypt.genSaltSync(); // enter number of rounds, default: 10
		let hash = bcrypt.hashSync( password, salt );
		return hash;
	}
	static sign( data ) {
		return jwt.sign( data, server_config.WEB_TOKEN_SECRET );
	}

	static generateToken( user ) {
		let token = UserHelper.sign({
			id: user.id,
			status: user.status,
			name: user.name,
			hasPassword: user.password,
			userType: user.type,
			avatar: user.profile_picture ? Helper.avatarURL(user.profile_picture) : null
		});
		return token;
	}
	static authRedirectUrl( path ) {
		return `${frontend_config.URL}/#/auth/validate-token/${path}`;
	}

}

module.exports =  UserHelper;
