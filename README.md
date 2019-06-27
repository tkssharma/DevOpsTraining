# My Application backend

REST API to support application features

[![Build Status](https://travis-ci.org/tkssharma/Training-App-Node-Api.svg?branch=master)](https://travis-ci.org/tkssharma/Training-App-Node-Api)

  - Twillo notification API used
  - Braintree payment gateway
  - Express as web framework
  - Passport js for social authentication
  - Express CORS enabled
  - Mongoose as ODM driver
  - TDD in progress with Mocha
  - Training API with MongoDB

# MEAN application using passport login and Node JS API #

"Its my personal portal application which i am using for providing training to other people , it has everything in it clinet side code and server side code which is deployed on heroku and using mongolab for mongo DB.

The application allows you to browse through a list of available courses and also provide you the platform to learn new things.

REST API developed in Node and React is consuming those services with Redux as state manager.

# Application dependancies
```javascript
"babel-istanbul": "^0.12.2",
"bcrypt-nodejs": "0.0.3",
"bluebird": "^3.4.7",
"body-parser": "1.15.2",
"braintree": "1.41.0",
"censoring": "1.0.1",
"chai": "^3.5.0",
"chai-as-promised": "^6.0.0",
"chai-http": "^3.0.0",
"cors": "2.8.0",
"csrf": "^3.0.4",
"csurf": "^1.9.0",
"email-templates": "2.5.2",
"express": "4.14.0",
"express-session": "1.14.1",
"faker": "3.1.0",
"helmet": "^3.4.0",
"immutable": "3.8.1",
"istanbul": "^0.4.5",
"jsonwebtoken": "7.1.9",
"lodash": "4.15.0",
"marked": "0.3.6",
"mocha": "^3.2.0",
"mongoose": "4.5.9",
"multer": "1.2.0",
"nodemailer": "2.5.0",
"nodemailer-mandrill-transport": "1.2.0",
"nodemon": "^1.11.0",
"passport": "0.3.2",
"passport-facebook": "2.1.1",
"passport-google-oauth": "1.0.0",
"passport-instagram": "1.0.0",
"passport-local": "1.0.0",
"passport-twitter": "1.0.4",
"pug": "2.0.0-beta6",
"request-ip": "1.2.2",
"superagent": "^3.4.4",
"superagent-promise": "^1.1.0",
"twilio": "2.11.1",
"validator": "5.5.0",
"winston": "^2.3.1"
```

# Application Execution
```javascript
git clone https://github.com/tkssharma/Training-App-Node-Api.git
npm install
npm run start
npm run test
npm run coverage
```
