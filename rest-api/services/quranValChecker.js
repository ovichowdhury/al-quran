var mongoose = require('mongoose');
const crypto = require('crypto');
const ethService = require('./ethService');

// Build the connection string
var dbURI = 'mongodb://localhost/QuranDB';

// Create the database connection
mongoose.connect(dbURI, { useNewUrlParser: true});

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    //console.log("Successfully connected to mongo");
    mongoose.connection.db.collection('books', async function(err, books) {
        let response = {};
        if(err) console.error("error connecting to db");
        let quran = await books.findOne({title: process.argv[2]});
        //console.log(quran);
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
            ethHash = await ethService.getAyatHash(i);
            if(cHash == blockHash && ayat.previousHash == previousBlockHash && cHash == ethHash) {
                previousBlockHash = cHash;
                continue;
            }
            else {
                response.currentHash = cHash;
                response.hash = blockHash;
                response.ethHash = ethHash;
                response.previousHash = ayat.previousHash;
                response.previousBlockHash = previousBlockHash;
                validity = false;
                break;
            }
        }
        
        if(validity){
            response.message = "Blockchain is Valid";
            console.log(JSON.stringify(response));
        }
        else{
            response.message = "Blockchain is Invalid";
            console.log(JSON.stringify(response));
        }

        mongoose.disconnect();
    });
});