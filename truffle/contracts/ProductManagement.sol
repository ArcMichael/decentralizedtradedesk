// truffle/contracts/ProductManagement.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductContract {
  struct Product {
    string id;
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

  mapping(string => Product) public products;
  string[] public productIds;
  uint256 public productCount;

  event ProductAdded(string id, string name, uint256 createdAt);
  event ProductUpdated(string id, string name, uint256 updatedAt);
  event ProductDeleted(string id, string name, uint256 deletedAt);

  function addProduct(
    string memory _id,
    string memory _name,
    string memory _description,
    uint256 _price,
    string memory _metadata,
    uint256 _createdAt,
    address _currentOwner,
    AdditionalDetails memory _details
  ) public {
    require(bytes(_id).length > 0, 'Product ID is required');
    products[_id] = Product(
      _id,
      _name,
      _description,
      _price,
      _metadata,
      _createdAt,
      msg.sender,
      _currentOwner,
      _details
    );
    productIds.push(_id);
    productCount++;
    emit ProductAdded(_id, _name, _createdAt);
  }

  function updateProduct(
    string memory _id,
    string memory _name,
    string memory _description,
    uint256 _price,
    string memory _metadata,
    uint256 _createdAt,
    address _currentOwner,
    AdditionalDetails memory _details
  ) public {
    require(bytes(_id).length > 0, 'Product ID is required');
    require(bytes(products[_id].id).length > 0, 'Product does not exist');
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

  function deleteProduct(string memory _id) public {
    require(bytes(_id).length > 0, 'Product ID is required');
    require(bytes(products[_id].id).length > 0, 'Product does not exist');
    Product storage product = products[_id];
    require(
      msg.sender == product.creator,
      'Only the creator can delete this product'
    );

    string memory productName = product.name;

    delete products[_id];
    for (uint i = 0; i < productIds.length; i++) {
      if (keccak256(bytes(productIds[i])) == keccak256(bytes(_id))) {
        productIds[i] = productIds[productIds.length - 1];
        productIds.pop();
        break;
      }
    }
    emit ProductDeleted(_id, productName, block.timestamp);
  }

  function getProductIds() public view returns (string[] memory) {
    return productIds;
  }
}
