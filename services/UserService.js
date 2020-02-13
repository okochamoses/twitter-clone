const { code, message } = require("./responses/ResponseObjects");
const ServiceResponse = require("./responses/ServiceResponse");
const logger = require("../config/logger");

class UserService {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async getFollowers({ userId }) {
    try {
      const followers = await this.userRepository.getFollowers({ userId });
      return new ServiceResponse(code.SUCCESS, message.SUCCESS, followers);
    } catch (e) {
      logger.info(
        `Error getting followers for user with ID: ${userId}. ${e.message}`
      );
      return new ServiceResponse(code.FAILURE, message.FAILURE);
    }
  }

  async find(limit, offset) {
    try {
      const users = await this.userRepository.find({}, { lean: false });
      return new ServiceResponse(code.SUCCESS, message.SUCCESS, users);
    } catch (error) {
      logger.info(`Error fetching users: ${e.message}`);
      return new ServiceResponse(code.FAILURE, message.FAILURE);
    }
  }
}

module.exports = UserService;
