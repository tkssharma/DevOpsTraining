

const passport = require ( 'passport');
const GoogleStrategy  = require ('passport-google-oauth').OAuth2Strategy;
const auth = require ( '../../../config/auth');
const Service = require ( '../../../helper/Service');

passport.use(new GoogleStrategy({
		clientID: auth.google.client_id,
		clientSecret: auth.google.client_secret,
		callbackURL: auth.google.callback_url,
		passReqToCallback : true,
	},
	( req, accessToken, refreshToken, profile, done ) => {

		let data = profile._json;
		Service.user.registerSocial(
			{
				provider: 'google',
				name: data.displayName,
				email: profile.emails[0].value,
				profile_picture: data.image.url,
				meta: {
					provider: 'google',
					id: data.id,
					token: accessToken,
				}
			},
			done
		);

	}
));


let GoogleRoutes = {

	authenticate: () => {
		return passport.authenticate(
			'google',
			{
				scope: [
					'https://www.googleapis.com/auth/userinfo.profile',
					'https://www.googleapis.com/auth/userinfo.email',
				]
			}
		);
	},

	callback: () => {
		return passport.authenticate('google', {
			// successRedirect: '/auth/success',
			failureRedirect: '/auth/failed'
		});
	}

}


module.exports =  GoogleRoutes;

