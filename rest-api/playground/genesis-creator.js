//console.log(); // unix time

const crypto = require('crypto');


function getUnixTime() {
    return Math.round(new Date().getTime() / 1000);
}

var pHash = "";

for(let i = 0; i < 64; i++){
    pHash = pHash + "0";
}

console.log(pHash.length);

let genesisBlock = {
    index : 0,
    nonce : 0,
    timestamp : getUnixTime(),
    previousHash : pHash,
    hash : ""
}

function mineBlock() {
    let hashString = genesisBlock.index.toString() + genesisBlock.nonce.toString() + genesisBlock.timestamp.toString() + genesisBlock.previousHash;
    let cHash = crypto.createHash('sha256').update(hashString).digest('hex');
    while(cHash.substring(0, 4) !== "0000"){
        console.log(cHash.substring(0,6));
        genesisBlock.nonce++;
        let hs = genesisBlock.index.toString() + genesisBlock.nonce.toString() + genesisBlock.timestamp.toString() + genesisBlock.previousHash;
        cHash = crypto.createHash('sha256').update(hs).digest('hex');
    }
    genesisBlock.hash = cHash;
} 

mineBlock();

console.log(genesisBlock);