// truffle/contracts/ProductManagement.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductContract {
  struct Product {
    uint256 id;
    string name;
    string description;
    uint256 price;
    uint256 stock;
    string category;
    string[] tags;
    uint256 createdAt;
    address creator; // Add creator field
  }

  mapping(uint256 => Product) public products;
  uint256 public productCount;

  event ProductAdded(uint256 id, string name, uint256 createdAt);

  function addProduct(
    string memory _name,
    string memory _description,
    uint256 _price,
    uint256 _stock,
    string memory _category,
    string[] memory _tags,
    uint256 _createdAt
  ) public {
    productCount++;
    products[productCount] = Product(
      productCount,
      _name,
      _description,
      _price,
      _stock,
      _category,
      _tags,
      _createdAt,
      msg.sender // Store creator address
    );
    emit ProductAdded(productCount, _name, _createdAt);
  }
}
