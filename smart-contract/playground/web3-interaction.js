var W3 = require('web3');
var abi = require('./abi.js');
const Tx = require('ethereumjs-tx');

//console.log(abi);

const web3 = new W3(new W3.providers.HttpProvider('https://rinkeby.infura.io/v3/162595ff143e4466a92c5983c29f5624'));

web3.eth.defaultAccount = "0xeB6241e6c10eAdB465e6098AD4ad3D9625C6D832";

var contractAddress = '0xc8d4AF58A7F21215687b56aFb92066295A72967b';

var priKey = "09261d406dd9c8c308dcd4b05445195762c01f3226d4df6132cb57e0a28a53c1";

const QuranContract = new web3.eth.Contract(abi, contractAddress, {
    from: web3.eth.defaultAccount, // default from address
    gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
});

function gettingTxInfo() {
    web3.eth.getTransaction("0x8da9d4d6c660fb4d107a0cada2691d31a16da5c3e617c4c1f29ecdcf91f98669")
        .then(tx => console.log(tx))
        .catch(err => console.log(err));
}


async function gettingAccountBalance() {

    let myBalanceWei = await web3.eth.getBalance(web3.eth.defaultAccount);

    console.log(myBalanceWei)

    let myBalance = web3.utils.fromWei(myBalanceWei, 'ether');

    console.log(myBalance);
}

//gettingAccountBalance();

async function invokeSmartContract() {

    let ayatHash = await QuranContract.methods.getAyat(1).call();
    console.log(ayatHash);
}

async function unlockAccount() {
    web3.eth.personal.unlockAccount(web3.eth.defaultAccount, "ovi123456789", 600)
        .then(console.log('Account unlocked!'));
}

async function sendTx() {
    var privateKey = Buffer.from(priKey, 'hex');
    let nonce = await web3.eth.getTransactionCount(web3.eth.defaultAccount);
    console.log(nonce);
    var rawTransaction = {
        "from": web3.eth.defaultAccount,
        "gasPrice": web3.utils.toHex(20 * 1e9),
        "gasLimit": web3.utils.toHex(210000),
        "to": contractAddress,
        "value": "0x0",
        "data": QuranContract.methods.addAyat(4, "this-is-4-hash").encodeABI(),
        "nonce": web3.utils.toHex(nonce)
    };

    var transaction = new Tx(rawTransaction);

    transaction.sign(privateKey);

    let txHash = await web3.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'));

    console.log(txHash);
}

async function sendTxForDelete() {
    var privateKey = Buffer.from("09261d406dd9c8c308dcd4b05445195762c01f3226d4df6132cb57e0a28a53c1", 'hex');
    let nonce = await web3.eth.getTransactionCount(web3.eth.defaultAccount);
    console.log(nonce);
    var rawTransaction = {
        "from": web3.eth.defaultAccount,
        "gasPrice": web3.utils.toHex(20 * 1e9),
        "gasLimit": web3.utils.toHex(210000),
        "to": contractAddress,
        "value": "0x0",
        "data": QuranContract.methods.deleteAyat(2).encodeABI(),
        "nonce": web3.utils.toHex(nonce)
    };

    var transaction = new Tx(rawTransaction);

    transaction.sign(privateKey);

    web3.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'))
        .on('transactionHash',console.log);


}

//sendTx();

//console.log("**********This is ENd***********");

invokeSmartContract();

//sendTxForDelete();
