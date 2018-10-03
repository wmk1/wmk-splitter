var Splitter = artifacts.require("./Splitter.sol");

const bob = "0xd5ee2fc6c83dbfa580c697f48d81d1647e38923c"; 

const carol = "0x3eaec546bc98faea13f2936e293f51204849511d";

module.exports = function(deployer) {
    deployer.deploy(Splitter, bob, carol);
}