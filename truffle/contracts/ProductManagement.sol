// truffle/contracts/ProductManagement.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductContract {
  struct Product {
    uint256 id;
    string name;
    string description;
    uint256 price;
    string metadata; // Store metadata as a string
    uint256 createdAt;
    address creator;
    address currentOwner; // Store current owner
    AdditionalDetails details;
  }

  struct AdditionalDetails {
    bool fixedPricePayment; // Fixed price payment condition
    string currency;
    string hash;
    string digitalSignature;
  }

  mapping(uint256 => Product) public products;
  uint256 public productCount;

  event ProductAdded(uint256 id, string name, uint256 createdAt);
  event ProductUpdated(uint256 id, string name, uint256 updatedAt);
  event ProductDeleted(uint256 id, string name, uint256 deletedAt);

  function addProduct(
    string memory _name,
    string memory _description,
    uint256 _price,
    string memory _metadata,
    uint256 _createdAt,
    address _currentOwner,
    AdditionalDetails memory _details
  ) public {
    productCount++;
    products[productCount] = Product(
      productCount,
      _name,
      _description,
      _price,
      _metadata,
      _createdAt,
      msg.sender,
      _currentOwner,
      _details
    );
    emit ProductAdded(productCount, _name, _createdAt);
  }

  function updateProduct(
    uint256 _id,
    string memory _name,
    string memory _description,
    uint256 _price,
    string memory _metadata,
    uint256 _createdAt,
    address _currentOwner,
    AdditionalDetails memory _details
  ) public {
    require(_id > 0 && _id <= productCount, 'Product does not exist');
    Product storage product = products[_id];
    product.name = _name;
    product.description = _description;
    product.price = _price;
    product.metadata = _metadata;
    product.createdAt = _createdAt;
    product.currentOwner = _currentOwner;
    product.details = _details;
    emit ProductUpdated(_id, _name, block.timestamp);
  }

  function deleteProduct(uint256 _id) public {
    require(_id > 0 && _id <= productCount, 'Product does not exist');
    Product storage product = products[_id];
    require(
      msg.sender == product.creator,
      'Only the creator can delete this product'
    );

    string memory productName = product.name;

    delete products[_id];
    emit ProductDeleted(_id, productName, block.timestamp);
  }
}
