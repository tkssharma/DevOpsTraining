

const passport = require('passport');
const LocalStrategy  =  require( 'passport-local');
const Service =  require('../../../helper/Service');

passport.use(new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true,
	},
	( req, email, password, done ) => {

		Service.user.findOne( { email: email }, (error, user) => {
			if ( error ) {
				console.log('local st.p error_ON'); return done( error );
			}
			else {
				if ( ! user ) { return done( null, { code: 401, message: 'error', error: 'incorrect email address' } ); }
				if ( ! user.comparePassword( password ) ) { return done( null, { code: 401, message: 'error', error: 'incorrect password' } ); }

				if ( user && user.comparePassword( password ) ) {
					return done( null, Service.user.transform(user) );
				} else {
					return done( null, { code: 401, message: 'error', error: 'incorrect password provided' } );
				}
			}
		});
	}
));
let LocalRoutes = {
	authenticate: () => {
		return passport.authenticate('local', { session: false });
	},
	authenticate_with_callback: () => {
		return passport.authenticate('local', {
			successRedirect: '/auth/success',
			failureRedirect: '/auth/failed'
		});
	},
}
module.exports =  LocalRoutes;
