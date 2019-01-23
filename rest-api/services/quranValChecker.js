var mongoose = require('mongoose');
const crypto = require('crypto');

// Build the connection string
var dbURI = 'mongodb://localhost/QuranDB';

// Create the database connection
mongoose.connect(dbURI, { useNewUrlParser: true});

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    mongoose.connection.db.collection('books', async function(err, books) {
        if(err) console.error("error connecting to db");
        let quran = await books.findOne({title: 'quran'});
        let ayats = quran.contents;
        ayats.forEach(ayat => {
            delete ayat._id
        });
        
        let previousBlockHash = ayats[0].hash;
        let validity = true;
        for(let i = 1; i < ayats.length; i++) {
            let ayat = ayats[i];
            let blockHash = ayat.hash;
            ayat.hash = ""; // because during mining hash was empty string
            cHash = crypto.createHash('sha256').update(JSON.stringify(ayat)).digest('hex');
            if(cHash == blockHash && ayat.previousHash == previousBlockHash) {
                previousBlockHash = cHash;
                continue;
            }
            else {
                console.log(JSON.stringify(ayat));
                console.log("Current Hash : ", cHash);
                console.log("Block Hash : ", ayat.hash);
                console.log("Previous Hash : ", ayat.previousHash);
                console.log("Previous Block Hash : ", previousBlockHash);
                validity = false;
                break;
            }
        }
        
        if(validity)
            console.log("valid");
        else
            console.log("Invalid");

        mongoose.disconnect();
    });
});