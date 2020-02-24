const socket = require("../socket");

class RealTimeService {
  constructor({ userRepository, inMemoryDBService }) {
    this.userRepository = userRepository;
    this.inMemoryDBService = inMemoryDBService;
  }

  async updateFollowerTimelines(userId, tweet) {
    const { followers } = await this.userRepository.getFollowers({ userId });
    this.inMemoryDBService.getAllKeys;
    followers.forEach(follower => {
      socket.io.emit(follower._id, tweet);
    });
  }
}

module.exports = RealTimeService;
