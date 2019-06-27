

const express = require ( 'express');
const Helper = require ( '../../helper');
const ResponseTemplate = require ( '../../global/templates/response');
const api_config = require ( '../../config/api');

const _ = require ( 'lodash');

let router = express.Router();
// default / get route
router.get('/', (req, res) => {
	res.json({
		code: 200,
		message: 'I am alive and listening',
		resources: [
			{
				resource: 'users',
				status: 'in development',
				url: Helper.resource('/users'),
			},
			{
				resource: 'auth',
				status: 'in development',
				default: {
					method: 'POST',
					url: Helper.resource('/auth')
				},
				providers: [
					{ name: 'facebook', url: Helper.resource('/auth/login/facebook') },
					{ name: 'google', url: Helper.resource('/auth/login/google') },
					{ name: 'twitter', url: Helper.resource('/auth/login/twitter') },
					{ name: 'instagram', url: Helper.resource('/auth/login/instagram') },
				],
			},
			{ resource: 'fake', status: 'in development', url: Helper.resource('/fake') },
			{
				resource: 'training',
				status: 'in development',
				url: Helper.resource('/training'),
			},
			{
				resource: 'webinar',
				status: 'in development',
				url: Helper.resource('/webinar'),
			},
			{ resource: 'payments', status: 'in development', url: Helper.resource('/payments') },
			{ resource: 'registration', status: 'in development', url: Helper.resource('/registration') },
			{ resource: 'training', status: 'in development', url: Helper.resource('/training') },

		]
	})
});

module.exports = router
