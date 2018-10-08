var Splitter = artifacts.require("./Splitter.sol");

module.exports = function(deployer, network, accounts) {
    const owner = accounts[0];
    const bob = accounts[1];
    const carol = accounts[2];

    deployer.deploy(Splitter, bob, carol, {from: owner});
}