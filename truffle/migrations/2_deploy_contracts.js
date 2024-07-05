// eslint-disable-next-line no-undef
const ProductManagement = artifacts.require('ProductManagement');

module.exports = function (deployer) {
  deployer.deploy(ProductManagement);
};
