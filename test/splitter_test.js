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

        contractInstance = await Splitter.new(bob, carol, {from: alice});
        return web3.eth.getBalance(alice)
            .then(_balance => {
                console.log("Alice balance: " + _balance);
            });
    });

    it("Should split ether accordingly",  () => {
        //given
        let amountSended = 5000000;
        let expectedAmount = "" + (amountSended / 2);
        //when
        return contractInstance.sendEther({ value: amountSended, from: alice})
            //then
            .then(txReceipt => {
                let eventNames = txReceipt.logs.filter(log => log.event == "LogEtherSended");
                assert(eventNames.length > 0, "No LogEtherSended events found, it it surely emitted?");
                assert.equal(eventNames[0].event, "LogEtherSended", "Some obstruction ");
                return web3.eth.getBalance(carol)
            })
            //then
            .then(_carol => {
                carol = _carol;
                assert.strictEqual(carol, expectedAmount.toString(10));
            });
    });

    it("Should not split ether if value is 0", () => {
        //given
        let zeroAmountSended = 0;
        //when
        try {
        contractInstance.sendEther({value: zeroAmountSended, from: alice});
        } catch(e) {
            assert.isDefined(e, 'Contract should revert() if there are no funds.');
        }
    })
});
