Promise = require("bluebird");
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const Splitter = artifacts.require("./Splitter.sol");

Promise.promisifyAll(web3.eth, { suffix: "Promise" });

contract("Splitter contract", (accounts) => {

    let alice;
    let bob;
    let carol;

    [alice, bob, carol] = accounts;

    let contractInstance;
    before("Checking if smart contract is setup properly -  accounts", async () => {
        assert.isAtLeast(accounts.length, 3, "not enough, something is wrong here....");

        console.log("Owner: " + alice);
        console.log("Bob: " + bob);
        console.log("Carol: " + carol);

        contractInstance = await Splitter.new(bob, carol)
        return web3.eth.getBalance(alice)
            .then(_balance => {
                console.log("Alice balance: " + _balance);
            });
    });

    it("Should split ether accordingly",  done => {
        //when
         contractInstance.sendEther.call({ value: 5000000, from: alice})
        //...now what
            .then(success => {
                assert.isTrue(success, "failed to do something.");
                return contractInstance.sendEther({value: 5000000, from: alice});
            })
            .then(resultValue => {
                assert.equal(resultValue.toString(10), "2", "one does not simply walk into a mordor.");
                done();
            })
            .catch(done);
    });

    it("Should not split ether if value is 0", async () => {
        //when
        await contractInstance.sendEther({ value: 0, from: alice});

        //then
        assert.fail();
    })
});
