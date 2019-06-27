const mongoose  = require( 'mongoose');
const config_server  = require( '../../config/server');
const config_database  = require( '../../config/database');

mongoose.Promise = global.Promise;

let MongoConnect = () => {
    // Create the database connection
    let url = `${config_database.default.HOST}/${config_database.default.NAME}`

    let db = mongoose.connect(url, function(error) {
        if (error) {
            console.log('Mongoose default connection error: ' + error);
        } else {
            console.log("mongo Connected :)");
        }
    });
    // When successfully connected
    mongoose.connection.on('connected', function() {
        console.log('Mongoose default connection open to ' + url);
    });

    // If the connection throws an error
    mongoose.connection.on('error', function(err) {
        console.log('Mongoose default connection error: ' + err);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function() {
        console.log('Mongoose default connection disconnected');
    });

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function() {
        mongoose.connection.close(function() {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
    return db;
}

module.exports = MongoConnect;
