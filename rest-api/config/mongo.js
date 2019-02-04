
var mongoose = require('mongoose');

// Build the connection string
var dbURI = 'mongodb://localhost/QuranDB';

// Create the database connection
mongoose.connect(dbURI, { useNewUrlParser: true, auto_reconnect: true });

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
    mongoose.disconnect();
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
    mongoose.connect(dbURI, { useNewUrlParser: true, auto_reconnect: true });
});

mongoose.connection.on('reconnected', function () {
    console.log('Mongoose default connection reconnected')
})

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
