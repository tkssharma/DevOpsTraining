// Middleware for Application
const ContentTypeMiddleware = require('./global/middlewares/ContentType');
const EmptyContentMiddleware = require('./global/middlewares/EmptyContent');
const CsrfMiddleware = require('./global/middlewares/csrfMiddleware');

const passport = require('passport');
const config_server = require('./config/server');
const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const csrf = require('csurf');

let middleware = function (app) {

    app.use(passport.initialize());
    app.set('port', process.env.PORT || config_server.PORT);
    // adding security fixes
    app.disable('x-powered-by');
    app.use(helmet())
    app.use(helmet.noCache({ noEtag: true })); //set Cache-Control header
    app.use(helmet.noSniff());    // set X-Content-Type-Options header
    app.use(helmet.frameguard()); // set X-Frame-Options header
    app.use(helmet.xssFilter());  // set X-XSS-Protection header

    app.enable('trust proxy', ['loopback', 'linklocal', 'uniquelocal'])

    app.use(body_parser.urlencoded({
        extended: false
    })); // parse application/x-www-form-urlencoded
    app.use(body_parser.json()); // parse application/json
    /**
     * enable CORS support. // Cross-Origin Request Support
     */
    // register all custom Middleware
    app.use(cors({
        optionsSuccessStatus: 200
    }));
    app.use(ContentTypeMiddleware);
    app.use(EmptyContentMiddleware);
    app.use(CsrfMiddleware);

}

module.exports =  middleware;
