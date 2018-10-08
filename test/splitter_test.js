Promise = require("bluebird");
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const Splitter = artifacts.require("./Splitter.sol");

Promise.promisifyAll(web3.eth, { suffix: "Promise" });

contract("Splitter contract", (accounts) => {
    const MAX_GAS = 30000;
    const AMOUNT = 0.0000007;

    console.log(accounts);

    let alice;
    let bob;
    let carol;

    [alice, bob, carol] = accounts;

    let ownerBalance;


    let contractInstance;
    beforeEach("Checking if smart contract is setup properly -  accounts", async () => {
        assert.isAtLeast(accounts.length, 3, "not enough, something is wrong here....");

        console.log("Owner: " + accounts[0]);
        console.log("Bob: " + bob);
        console.log("Carol: " + carol);

        contractInstance = await Splitter.new(bob, carol)
        return web3.eth.getBalance(alice)
            .then(_balance => {
                ownerBalance = _balance;
                console.log("Alice balance: " + ownerBalance);
            });
    });

    it("Should check if any pre-condition thing is working properly", async () => {
        assert.isTrue(accounts.length >= 3, accounts.length + " accounts, required 3. Something ain't right.");
    });

    it("Should split ether accordingly", () => {

        contractInstance.splitEther();
    });
});
