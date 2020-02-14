const { code, message } = require("./responses/ResponseObjects");
const ServiceResponse = require("./responses/ServiceResponse");
const logger = require("../config/logger");

class UserService {
  constructor({ userRepository, tweetService }) {
    this.userRepository = userRepository;
    this.tweetService = tweetService;
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

  async getFollowingTweets({ userId }) {
    try {
      const user = await this.userRepository.find(
        { _id: userId },
        { lean: true, multiple: false }
      );
      const followingList = user.following;
      const tweets = await this.tweetService.getTweetsByUsers(followingList);

      return new ServiceResponse(code.SUCCESS, message.SUCCESS, tweets);
    } catch (e) {
      logger.info(`Error fetching user following tweets: ${e.message}`);
      return new ServiceResponse(code.FAILURE, message.FAILURE);
    }
  }

  async follow({ userId, userToFollowId }) {
    try {
      const user = await this.userRepository.find(
        { _id: userId },
        { lean: true, multiple: false }
      );
      const userToFollow = await this.userRepository.find(
        { _id: userToFollowId },
        { lean: true, multiple: false }
      );

      // Add new user to logged in user following list
      const followingList = user.followers;
      followingList.push(userToFollow._id);

      // Add logged in user to userToFollow follower list
      const followerList = userToFollow.followers;
      followerList.push(user._id);

      // Update both users
      await this.userRepository.update(user, { following: followingList });
      await this.userRepository.update(userToFollow, {
        followers: followerList
      });

      return new ServiceResponse(code.SUCCESS, message.SUCCESS);
    } catch (e) {
      logger.info(
        `Error following user with ID of ${userToFollowId}: ${e.message}`
      );
      return new ServiceResponse(code.FAILURE, message.FAILURE);
    }
  }
}

module.exports = UserService;
