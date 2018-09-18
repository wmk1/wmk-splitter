pragma solidity ^0.4.24;

contract Migrations {
  address public owner;
  uint public last_completed_migration;

  constructor() public {
    msg.sender = owner;
  }

  modifier restricted() {
    require(owner);
    _;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }

  function upgrade(address new_address) public restricted {
    Migrations upgraded = Migrations(new_address);
    upgraded.setCompleted(last_completed_migration);
  }

}
