

const jwt = require( 'jsonwebtoken');
const config_server = require( '../../config/server');
const Service = require( '../../helper/Service');
const ResponseTemplate = require( '../../global/templates/response');

let ValidAuthToken = (req, res, next) => {

    const token = req.headers.authorization;

    if (token) {
        console.log(token);
        jwt.verify(token, config_server.WEB_TOKEN_SECRET, (err, decoded_user) => {
            if (err) {
                res.status(400).json(ResponseTemplate.authError());
            } else {
                Service.user.findById(decoded_user.id, (error, user) => {
                    if (error) {
                        res.status(400).json(ResponseTemplate.authError());
                    } else {
                        req.user = user;
                        next();
                    }
                });
            }
        });

    } else {
        res.status(400).json(ResponseTemplate.authError());
    }


}


module.exports = ValidAuthToken;
