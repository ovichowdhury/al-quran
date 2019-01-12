const crypto = require('crypto');


function getUnixTime() {
    return Math.round(new Date().getTime() / 1000);
}

try {
    var quranBlock = JSON.parse(process.argv[2]);

    var hashString = process.argv[2];

    cHash = crypto.createHash('sha256').update(hashString).digest('hex');

    while (cHash.substring(0, 4) !== "0000") {
        quranBlock.nonce++;
        quranBlock.timestamp = getUnixTime();
        let hs = JSON.stringify(quranBlock);
        cHash = crypto.createHash('sha256').update(hs).digest('hex');
    }

    quranBlock.hash = cHash;

    console.log("In miner ending");

    console.log(quranBlock);


    process.send(quranBlock);
}
catch(ex) {
    process.send({message: "Mining Error"});
}
