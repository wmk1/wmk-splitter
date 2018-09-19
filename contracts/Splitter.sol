pragma solidity ^0.4.24;

contract Splitter {
    uint ownerWeis;
    address owner;

    WalletOwner[2] public recipients;

    bool isOwner;

    struct WalletOwner {
        uint balance;
        address holder;
    }

    modifier onlyIfOwner {
        require(isOwner);
        _;
    }

    event LogSplittedSucceded(uint _weis);
    event LogEtherSended(address _owner);

    constructor(address _bob, address _carol) public payable {
        owner = msg.sender;
        ownerWeis = 0;
        recipients[0].balance = 0;
        recipients[1].balance = 0;
        recipients[0].holder = _bob;
        recipients[1].holder = _carol;
    }

    function sendEther() public payable {
        uint transferedAmount = transferSplit(msg.value);
        for (uint i = 0; i < recipients.length; i++) {
            recipients[i].balance += transferedAmount;
            emit LogEtherSended(recipients[i].holder);
        }
    }

    function transferSplit(uint _ether) private view returns (uint splittedAmount) {
        uint etherForSplit = _ether + ownerWeis;
        if (_ether % 2 == 0) {
            etherForSplit = etherForSplit / 2;
        }
        else {
            etherForSplit = (etherForSplit - 1) / 2;
        }
        emit LogSplittedSucceded(_ether);
        return etherForSplit;
    }

    function checkBalance(address _walletOwner) public payable returns (uint256 addressBalance) {
        return _walletOwner.balance;
    }

}
