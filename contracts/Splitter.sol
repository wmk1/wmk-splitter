pragma solidity ^0.4.24;

contract Splitter {

    uint ownerWeis;
    address owner;

    mapping (address => uint) public balances;

    WalletOwner[2] public recipients;

    struct WalletOwner {
        uint balance;
        address holder;
    }

    modifier validEtherSend {
        require(msg.value > 0);
        _;
    }

    event LogSplittedSucceded(uint _weis);
    event LogEtherSended(address _recipient, address _recipient2, uint _owner);
    event LogWithdrawal(address _recipient, uint _amount);

    constructor(address _bob, address _carol) public payable {
        require(_bob != 0);
        require(_carol != 0);
        owner = msg.sender;
        recipients[0].holder = _bob;
        recipients[1].holder = _carol;
    }

    function sendEther() public validEtherSend payable {
        uint amount = msg.value;
        if (amount % 2 == 0) {
            ownerWeis = 0;
            amount = amount / 2;
        } else {
            ownerWeis = 1;
            amount = (amount - 1) / 2;
        }
        recipients[0].balance += amount;
        recipients[1].balance += amount;
        emit LogEtherSended(recipients[0].holder, recipients[1].holder, amount);
    }

    function withdraw() public validEtherSend payable returns(bool success) {
        uint amount = balances[msg.sender];
        require(amount > 0);
        balances[msg.sender] = 0;
        emit LogWithdrawal(msg.sender, amount);
        msg.sender.transfer(amount);
        return true;
    }

    function() public {
        revert();
    }
}
