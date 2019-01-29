var W3 = require('web3');
var abi = require('./abi.js');

//console.log(abi);

const web3 = new W3(new W3.providers.HttpProvider('https://rinkeby.infura.io/v3/162595ff143e4466a92c5983c29f5624'));

web3.eth.defaultAccount = "0xeB6241e6c10eAdB465e6098AD4ad3D9625C6D832";

const QuranContract = new web3.eth.Contract(abi, '0xc8d4AF58A7F21215687b56aFb92066295A72967b', {
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
    
    let ayatHash = await QuranContract.methods.getAyat(2).call();
    console.log(ayatHash);
}

async function unlockAccount(){
    web3.eth.personal.unlockAccount(web3.eth.defaultAccount, "ovi123456789", 600)
        .then(console.log('Account unlocked!'));
}

async function addAyatInQuranContract() {
    QuranContract.methods.addAyat(2, "this-is-second-hash").send({from: web3.eth.defaultAccount})
        .on('transactionHash', (hash) => {
            console.log(hash);
        })
        .on('receipt', (receipt) => {
            console.log(receipt);
        })
        .on('confirmation', (confirmationNumber, receipt) => {
            console.log(confirmationNumber);
        })
        .on('error', console.error);
}

//addAyatInQuranContract();




web3.eth.personal.unlockAccount(web3.eth.defaultAccount, "ovi123456789", 600)
        .then((d) => console.log(d));