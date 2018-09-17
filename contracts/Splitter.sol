pragma solidity ^0.4.0;

contract Splitter {
    uint256 ownerWeis;
    address owner;

    struct WalletOwner {
        uint balance;
        address holder;
    }

    function Splitter(address bob, address carol){
        ownerWeis = 0;
        msg.sender = owner;
        recipients[1].balance = 0;
        recipients[2].balance = 0;
        recipients[1].holder = bob;
        recipients[2].holder = carol;
    }

    WalletOwner[2] public recipients;



}
