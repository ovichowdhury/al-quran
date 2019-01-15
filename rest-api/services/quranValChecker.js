var mongoose = require('mongoose');

// Build the connection string
var dbURI = 'mongodb://localhost/QuranDB';

// Create the database connection
mongoose.connect(dbURI, { useNewUrlParser: true});

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    mongoose.connection.db.collection('books', async function(err, books) {
        if(err) console.error("error connecting to db");
        let book = await books.findOne({title: 'quran'});
        let ayats = book.contents;
        console.log(ayats);
        mongoose.disconnect();
    });
});