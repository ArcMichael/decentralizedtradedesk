// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract UserLogin {
  struct User {
    string username;
    string password;
  }

  mapping(address => User) private users;

  function register(string memory _username, string memory _password) public {
    users[msg.sender] = User(_username, _password);
  }

  function login(
    string memory _username,
    string memory _password
  ) public view returns (bool) {
    User memory user = users[msg.sender];
    return (keccak256(abi.encodePacked(user.username)) ==
      keccak256(abi.encodePacked(_username)) &&
      keccak256(abi.encodePacked(user.password)) ==
      keccak256(abi.encodePacked(_password)));
  }
}
