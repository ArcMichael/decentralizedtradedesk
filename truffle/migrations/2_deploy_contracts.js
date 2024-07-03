// eslint-disable-next-line no-undef
const UserLogin = artifacts.require('UserLogin');

module.exports = function (deployer) {
  deployer.deploy(UserLogin);
};
