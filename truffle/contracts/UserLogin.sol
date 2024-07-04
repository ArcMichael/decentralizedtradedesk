// SPDX-License-Identifier: UNLICENSED
// contracts/UserLogin.sol

pragma solidity ^0.8.19;

contract UserLogin {
  mapping(address => bool) public users;

  function register() public {
    users[msg.sender] = true;
  }

  function isValidUser(address user) public view returns (bool) {
    return users[user];
  }
}
