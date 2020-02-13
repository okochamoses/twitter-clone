const awilix = require("awilix");
const UserService = require("../services/UserService");
const UserRepository = require("../repository/UserRepository");
const EncryptionService = require("../services/EncryptionService");
const AuthService = require("../services/AuthService");

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
});

container.register({
  userService: awilix.asClass(UserService),
  userRepository: awilix.asClass(UserRepository),
  authService: awilix.asClass(AuthService),
  encryptionService: awilix.asClass(EncryptionService)
});

module.exports = container;
