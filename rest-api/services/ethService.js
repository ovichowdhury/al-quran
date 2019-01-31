const W3 = require('web3');
const Tx = require('ethereumjs-tx');
const fs = require('fs');
const path = require('path');

var ethPath = path.join(__dirname, '../', '/config/eth.json');

const ethConf = JSON.parse(fs.readFileSync(ethPath));

const web3 = new W3(new W3.providers.HttpProvider(ethConf.provider));

web3.eth.defaultAccount = ethConf.defaultAccount;

const contractAddress = ethConf.contractAddress;

const priKey = ethConf.defaultAccountPrivateKey;

const QuranContract = new web3.eth.Contract(ethConf.contractABI, contractAddress, {
    from: web3.eth.defaultAccount, // default from address
    gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
});

async function addAyatHash(index, hash) {
    var privateKey = Buffer.from(priKey, 'hex');
    let nonce = await web3.eth.getTransactionCount(web3.eth.defaultAccount);
    console.log(nonce);
    var rawTransaction = {
        "from": web3.eth.defaultAccount,
        "gasPrice": web3.utils.toHex(20 * 1e9),
        "gasLimit": web3.utils.toHex(210000),
        "to": contractAddress,
        "value": "0x0",
        "data": QuranContract.methods.addAyat(index, hash).encodeABI(),
        "nonce": web3.utils.toHex(nonce)
    };

    var transaction = new Tx(rawTransaction);

    transaction.sign(privateKey);

    let ethTxDetails = await web3.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'));
    return ethTxDetails;
}

async function deleteAyatHash(index) {

}

async function getAyatHash(index) {

}

module.exports = {
    addAyatHash: addAyatHash,
    deleteAyatHash: deleteAyatHash,
    getAyatHash: getAyatHash
}