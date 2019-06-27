

const config_server =  require('../config/server');
const fs = require('fs');
const path =  require('path');

let Default = {
	resource( path ) {
		return `${config_server.HOST}${config_server.PORT ? `:${config_server.PORT}` : ''}${path}`;
	},
	getFileExtension( file ) {
		let extensions = file.split('.');
		if ( extensions.length === 1 ) {
			return 'jpg';
		} else {
			return extensions.pop();
		}
	},
	avatarURL( filename ) {
		if ( filename.includes('://') ) {
			return filename;
		}
		return Default.resource(`/${config_server.UPLOAD_DIR}/${config_server.PROFILE_PICTURE_DIR}/${filename}`);
	},
	eventImageURL( filename ) {
		if ( filename.includes('://') ) {
			return filename;
		}
		return Default.resource(`/${config_server.UPLOAD_DIR}/${config_server.EVENT_IMAGES_DIR}/${filename}`);
	},

	userDocumentURL( filename ) {
		if ( filename.includes('://') ) {
			return filename;
		}
		return Default.resource(`/${config_server.UPLOAD_DIR}/${config_server.DOCUMENT_UPLOAD_DIR}/${filename}`);
	},
	randomString() {
		return Math.random().toString(36).substring(2, 7);
	},
	deleteFile( type, filename ) {
		let location;
		if ( type === 'profile' ) { location = path.join( config_server.UPLOAD_DIR, config_server.PROFILE_PICTURE_DIR ) }
		else if ( type === 'event' ) { location = path.join( config_server.UPLOAD_DIR, config_server.EVENT_IMAGES_DIR ) }
		else if ( type === 'document' ) { location = path.join( config_server.UPLOAD_DIR, config_server.DOCUMENT_UPLOAD_DIR ) }
		else { location = config_server.UPLOAD_DIR; }

		if ( filename ) {
			fs.unlink( path.join( location, filename ), () => {
				// in case we need to perform additional operations.
			});
		}
	},

	getPaymentMethodName( method ) {
		if ( method == 1 ) { return 'Credit Card'; }
		else if ( method == 2 ) { return 'Payu India'; }
		else if ( method == 3 ) { return 'PayPal'; }
		else { return 'Not Specified'; }
	},
	verificationCode() {
		let code = Math.floor((Math.random()*999999)+111111);
		return code;
	}
}


module.exports =  Default;
