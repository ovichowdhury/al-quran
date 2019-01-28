const QuranContract = artifacts.require('./QuranContract.sol');

module.exports = function(deployer) {
    deployer.deploy(QuranContract);
};