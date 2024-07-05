// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductManagement {
  struct Product {
    uint id;
    string name;
    string description;
    uint price; // 价格以wei为单位
    uint stock;
    string category;
    string[] tags;
  }

  Product[] public products;
  uint public nextProductId = 0;

  function addProduct(
    string memory name,
    string memory description,
    uint price,
    uint stock,
    string memory category,
    string[] memory tags
  ) public {
    products.push(
      Product(nextProductId, name, description, price, stock, category, tags)
    );
    nextProductId++;
  }

  function getProduct(uint productId) public view returns (Product memory) {
    require(productId < products.length, 'Product does not exist.');
    return products[productId];
  }
}
