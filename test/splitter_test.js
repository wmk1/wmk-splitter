Promise = require("bluebird");
const Web3 = require("Web3");

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const Splitter = artifacts.require("./Splitter.sol");

Promise.promisifyAll(web3.eth, { suffix: "Promise" });
let contractInstance;

contract("Splitter contract", (accounts) => {
    const MAX_GAS = 30000;
    const AMOUNT = web3.toWei(0.007, 'ether');

    console.log(accounts);

    let alice;
    let bob;
    let carol;

    beforeEach("Checking accounts", async () => {
        assert.isAtLeast(accounts.length, 3, "not enough, something is wrong here....");
        [alice, bob, carol] = accounts;
        console.log("Owner: " + accounts[0]);
        console.log("Bob: " + bob);
        console.log("Carol: " + carol);
    })

    let ownerBalance;
    before("Should get alice balance", async() => {
        return web3.eth.getBalance(alice)
            .then(_balance => {
                ownerBalance = _balance;
                console.log("Alice balance: " + ownerBalance);
            });
    });


});
