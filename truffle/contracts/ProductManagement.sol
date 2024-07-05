// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductContract {
  struct Product {
    string name;
    string description;
    uint256 price;
    uint256 stock;
    string category;
    string[] tags;
    uint256 createdAt; // Add createdAt to the product structure
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
    uint256 _createdAt // Add createdAt parameter
  ) public {
    productCount++;
    products[productCount] = Product(
      _name,
      _description,
      _price,
      _stock,
      _category,
      _tags,
      _createdAt // Store createdAt
    );
    emit ProductAdded(productCount, _name, _createdAt);
  }
}
