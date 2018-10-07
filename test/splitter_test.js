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

    let ownerBalance;


    let contractInstance;
    beforeEach("Checking accounts", async () => {
        assert.isAtLeast(accounts.length, 3, "not enough, something is wrong here....");
        [alice, bob, carol] = accounts;
        console.log("Owner: " + accounts[0]);
        console.log("Bob: " + bob);
        console.log("Carol: " + carol);

        contractInstance = await Splitter.deployed(bob, carol)
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
        let instance;

        return Splitter.deployed(bob, carol)
            .then(_instance => {
                instance = _instance;
                return instance.splitEther().call({from: accounts[0]});
                assert.isTrue(web3.eth.getBalance(carol) > 0, "Wrong amount! Something ain't right.");
            });
    });
});
