const express =  require ( 'express');
const passport =  require ( 'passport');
const FacebookRoutes =  require ( './providers/Facebook');
const GoogleRoutes =  require ( './providers/Google');
const TwitterRoutes =  require ( './providers/Twitter');
const InstagramRoutes =  require ( './providers/Instagram');
const LocalRoutes =  require ( './providers/Local');

const Helper =  require ( '../../helper/User');
const UserController =  require ( '../../services/training/controller/UserController');
const ValidAuthTokenMiddleware =  require ( '../../global/middlewares/ValidAuthToken');
let router = express.Router();
passport.serializeUser( (user, done) => {
	done(null, user);
});
passport.deserializeUser( (user, done) => {
	done(null, user);
});
/**
 * @api {POST} /auth/success local auth
 * @apiName auth failure
 * @apiGroup Auth
 * @apiSuccess {String} code HTTP status code =  require ( API.
 * @apiSuccess {String} message Message =  require ( API.
 */
router.get( '/success', (req, res) => {
	res.json({ message: 'success', login: true });
});
/**
 * @api {POST} /auth/failed local auth
 * @apiName auth Success
 * @apiGroup Auth
 * @apiSuccess {String} code HTTP status code =  require ( API.
 * @apiSuccess {String} message Message =  require ( API.
 */
router.get( '/failed', (req, res) => {
	res.json({ message: 'failed', login: false });
});

/**
 * @api {POST} /auth/ local auth
 * @apiName local login
 * @apiGroup Auth
 * @apiSuccess {String} code HTTP status code =  require ( API.
 * @apiSuccess {String} message Message =  require ( API.
 */

router.post('/login', LocalRoutes.authenticate(),
	( req, res ) => {
		if ( ! req.user.email ) {
			res.status(401).json({
				code: 401,
				success : false,
				message: 'invalid cradenatials provided',
			});
		}
		else {
			let token = Helper.generateToken(req.user);
			res.json({
				code: 200,
				message: 'success',
				token: token
			});
		}
	}
);

router.post( '/register', (req, res) => {
	UserController.registerDefault( req.body, ( error, user ) => {
		if ( error ) {
			res.status(400).json({ code: 400, success: false, message: error });
		}
		else {
			res.json({
				code: 200,
				message: 'success',
				user: user
			});
		}
	});
});

// send token to client side
let redirectSocialUser = ( req, res ) => {
	let token = Helper.generateToken(req.user);
	res.redirect( Helper.authRedirectUrl(`?token=${token}`) );
}

/**
 * @api {POST} /auth/login/facebook Social Login
 * @apiName facebook
 * @apiGroup Auth
 * @apiSuccess {String} code HTTP status code =  require ( API.
 * @apiSuccess {String} message Message =  require ( API.
*/
 router.get('/login/facebook', FacebookRoutes.authenticate() );
router.get( '/callback/facebook', FacebookRoutes.callback(), redirectSocialUser );
/**
 * @api {POST} /auth/login/google Social Login
 * @apiName google
 * @apiGroup Auth
 * @apiSuccess {String} code HTTP status code =  require ( API.
 * @apiSuccess {String} message Message =  require ( API.
 */

router.get('/login/google', GoogleRoutes.authenticate() );
router.get( '/callback/google', GoogleRoutes.callback(), redirectSocialUser );

/**
 * @api {POST} /auth/login/twitter Social Login
 * @apiName twitter
 * @apiGroup Auth
 * @apiSuccess {String} code HTTP status code =  require ( API.
 * @apiSuccess {String} message Message =  require ( API.
 */

router.get('/login/twitter', TwitterRoutes.authenticate() );
router.get( '/callback/twitter', TwitterRoutes.callback(), redirectSocialUser );
/**
 * @api {POST} /auth/login/instagram Social Login
 * @apiName instagram
 * @apiGroup Auth
 * @apiSuccess {String} code HTTP status code =  require ( API.
 * @apiSuccess {String} message Message =  require ( API.
 */

router.get('/login/instagram', InstagramRoutes.authenticate() );
router.get( '/callback/instagram', InstagramRoutes.callback(), redirectSocialUser );

/**
 * @api {GET} /auth/validate validate token with Middleware
 * @apiName validate
 * @apiGroup Auth
 * @apiSuccess {String} code HTTP status code =  require ( API.
 * @apiSuccess {String} message Message =  require ( API.
 */
/**
 * @swagger
 * /auth/validate:
 *   get:
 *     tags:
 *       - auth
 *     description: Returns all puppies
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of puppies
 */
router.get( '/validate', ValidAuthTokenMiddleware, (req, res) => {
	res.json({
		code: 200,
		message: 'success',
		valid: true,
	});
});
/**
 * @api {POST} /auth/reset-password update password sent in Mail
 * @apiName resetPassword
 * @apiGroup Auth
 * @apiSuccess {String} code HTTP status code =  require ( API.
 * @apiSuccess {String} message Message =  require ( API.
 */
router.post( '/reset-password', (req, res) => {

	if ( ! req.body || ! req.body.email ) {
		res.status(401).json({
			code: 401,
			message: 'email address not provided',
			success: false,
		});
	}
	else {
		UserController.resetPassword( req.body.email, ( error, success) => {
			if ( error ) {
				res.status(401).json({ code: 401, success: false, message: 'provided email is not registered with us' });
			} else {
				res.json({
					code: 200,
					success: true,
					message: 'if this email is registered with us, you will receive a password reset email soon.',
				});
			}
		});
	}
});
module.exports = router;
