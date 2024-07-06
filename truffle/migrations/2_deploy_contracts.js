// truffle/migrations/2_deploy_contracts.js

const ProductContract = artifacts.require('ProductContract');

module.exports = function (deployer) {
  deployer.deploy(ProductContract);
};
