

const api_config =  require('../config/api');
// const twilio from 'twilio';
// let client = new twilio.RestClient( api_config.twilio.sid, api_config.twilio.token );
var client = require('twilio')( api_config.twilio.sid, api_config.twilio.token );

class TwilioHelper {

	phone_verification( phone_number, code, callback ) {
		client.sendMessage({
			to: phone_number,
			from: api_config.twilio.phone,
			body: `Hello from Ubmas\nYour verification code is ${code}`,
		}, (err, message) => {
			callback(message);
		});
	}
	password_reset_notification( phone ) {
		client.sendMessage({
			to: phone,
			from: api_config.twilio.phone,
			body: `Ubmas\nYour password has been successfully reset.`,
		}, (err, message) => {
			//
		});
	}
	default_notification( phone, message ) {
		client.sendMessage({
			to: phone,
			from: api_config.twilio.phone,
			body: `Ubmas\n${message}`,
		}, (err, message) => {
			//
		});
	}
	event_booked_guest( phone ) {
		TwilioHelper.default_notification( phone, 'Your event has been successfully booked and confirmed.' );
	}
	event_booked_host( phone ) {
		TwilioHelper.default_notification( phone, 'A new guest has booked one of your event.' );
	}
	message_received( phone ) {
		TwilioHelper.default_notification( phone, 'You have received a new message, Please login to check.' );
	}
	leave_review( phone ) {
		TwilioHelper.default_notification( phone, 'We hope you had a wonderful time at the event, Please do leave a review for the host.' );
	}

}


module.exports =  new TwilioHelper();
