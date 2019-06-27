

const ResponseTemplate =  require('../../global/templates/response');

let ContentType = ( req, res, next ) => {

	
	if ( req.method === 'POST'  ) {
		let content_type = req.headers['content-type'];

		if ( !content_type || content_type.indexOf('application/json') !== 0 ) {
			res.json( ResponseTemplate.invalidContentType() );
		}
		else {
			next();
		}
	}
	else {
		next();
	}

}

module.exports = ContentType;
