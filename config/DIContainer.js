const awilix = require("awilix");
const UserService = require("../services/UserService");
const UserRepository = require("../repository/UserRepository");
const Logger = require("./logger");

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
});

container.register({
  userService: awilix.asClass(UserService),
  userRepository: awilix.asClass(UserRepository)
});

module.exports = container;
