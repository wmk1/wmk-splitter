
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));



web3.eth.getCoinbase(function(err, coinbase) {
    if (err) {
        console.error(err);
    } else {
        console.log("Coinbase: " + coinbase);
    }
});

const abi = [
    {"constant":false,"inputs":[],"name":"sendEther","outputs":[],"payable":true,"stateMutability":"payable","type":"function"}
    ,{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"recipients","outputs":[{"name":"balance","type":"uint256"},{"name":"holder","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_bob","type":"address"},{"name":"_carol","type":"address"}],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_weis","type":"uint256"}],"name":"LogSplittedSucceded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_owner","type":"uint256"}],"name":"LogEtherSended","type":"event"}];

const splitterAddress = "0xa104c3f956a78e9aabf1427a2d8a1864b9ea0087"; // Needs to be changed every time splitter is deployed.
const contract = web3.eth.contract(abi);
const instance = contract.at(splitterAddress);
    
web3.eth.getBalance(splitterAddress, function(err, balance) {
    if (err) {
        console.error(err);
    } else {
        console.log("Splitter balance from web3: " + web3.eth.getBalance(web3.eth.accounts[0]).toString(10));
    }
});

instance.getBalance.call(function(err, balance) {
    if (err) {
        console.error(err);
    } else {
        console.log("Splitter balance: " + balance);
    }
});

function donate(donAmount) {
    web3.eth.getCoinbase(function(err, coinbase) {
        if (err) {
            console.error(err);
        } else {
		splitterInstance.donate.sendTransaction({ from: coinbase, value: donAmount, gas: 100000 }, 
		(err, result) => { console.log("donate txn: " + result); } );
        }
    });
}