const mongoose =  require('mongoose');
const { url } = global['configuration'].mongo;

mongoose.Promise = global.Promise;

let MongoConnect = function() {
    var db = mongoose.connect(url, function(error) {
        if (error) {
            console.log('Mongoose default connection error: ' + error);
        } else {
            console.log("mongo Connected :)");
        }
    });
    // Create the database connection
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