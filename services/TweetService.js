const {
  code,
  message: responseMessage
} = require("./responses/ResponseObjects");
const ServiceResponse = require("./responses/ServiceResponse");
const logger = require("../config/logger");

class TweetService {
  constructor({ tweetRepository }) {
    this.tweetRepository = tweetRepository;
  }

  async postTweet(message, userId) {
    try {
      const tweet = await this.saveTweet(message, userId);
      if (tweet === null) {
        return new ServiceResponse(code.FAILURE, responseMessage.FAILURE);
      } else {
        return new ServiceResponse(
          code.SUCCESS,
          responseMessage.SUCCESS,
          tweet
        );
      }
    } catch (e) {
      logger.info(
        `Error posting tweet with for user with ID of ${userId}: ${e.message}`
      );
      return new ServiceResponse(code.FAILURE, responseMessage.FAILURE);
    }
  }

  async saveTweet(message, userId) {
    try {
      const tweetObject = {
        message,
        userId
      };
      const tweet = await this.tweetRepository.create(tweetObject);
      return tweet;
    } catch (e) {
      logger.info(
        `Error saving tweet to database for user with ID of ${userId}: ${e.message}`
      );
      return null;
    }
  }

  async replyTweet(parentTweetId, message, userId) {
    try {
      const reply = await this.saveTweet(message, userId);
      if (reply === null) {
        return new ServiceResponse(code.FAILURE, responseMessage.FAILURE);
      }
      const updated = await this.addTweetToReplies(parentTweetId, reply.id);
      if (updated == null) {
        return new ServiceResponse(code.FAILURE, responseMessage.FAILURE);
      }
      return new ServiceResponse(code.SUCCESS, responseMessage.SUCCESS, reply);
    } catch (e) {
      logger.info(
        `Error replying tweet with ID of ${parentTweetId}: ${e.message}`
      );
      return new ServiceResponse(code.FAILURE, responseMessage.FAILURE);
    }
  }

  async addTweetToReplies(parentTweetId, replyTweetId) {
    try {
      const tweet = await this.tweetRepository.find(
        { _id: parentTweetId },
        { multiple: false }
      );
      tweet.replies.push(replyTweetId);
      const updatedTweet = await this.tweetRepository.update(tweet, {
        replies: tweet.replies
      });
      return updatedTweet;
    } catch (e) {
      logger.info(
        `Error adding tweet with ID of ${replyTweetId} to parent tweet with ID ${parentTweetId} list: ${e.message}`
      );
      return null;
    }
  }

  async getTweetsByUsers(users) {
    try {
      const tweets = await this.tweetRepository.findTweetsByUsers(users);
      return tweets;
    } catch (e) {
      logger.info(`Error finding tweets: ${e.message}`);
      return null;
    }
  }

  async search(searchValue) {
    // search users
    try {
      const users = await this.tweetRepository.search(searchValue);
      return new ServiceResponse(code.SUCCESS, responseMessage.SUCCESS, users);
    } catch (e) {
      logger.info(
        `Error searching tweet search string with value of ${searchValue}: ${e.message}`
      );
      return new ServiceResponse(code.FAILURE, responseMessage.FAILURE);
    }
  }

  async getTweet(tweetId) {
    try {
      const tweet = await this.tweetRepository.findRepliesByTweetId(tweetId);
      if (tweet === null) {
        return new ServiceResponse(code.FAILURE, "Tweet not found");
      }
      return new ServiceResponse(code.SUCCESS, responseMessage.SUCCESS, tweet);
    } catch (e) {
      logger.info(
        `Error getting tweet search string with value of ${tweetId}: ${e.message}`
      );
      return new ServiceResponse(code.FAILURE, responseMessage.FAILURE);
    }
  }
}

module.exports = TweetService;
