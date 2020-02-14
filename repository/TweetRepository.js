const MongooseRepository = require("./MongooseRepository");
const Tweet = require("../models/Tweet");

class TweetRepository extends MongooseRepository {
  constructor() {
    super({ model: Tweet });
  }

  async findRepliesByTweetId(id) {
    return this.collection
      .findById(id)
      .select("message replies user")
      .populate("user username")
      .populate("Tweet", "message createdAt")
      .exec();
  }

  async findTweetsByUsers(users) {
    try {
      return this.collection
        .find({ userId: { $in: users } })
        .sort({ createdAt: "desc" })
        .exec();
    } catch (e) {
      console.log(e);
    }
  }

  async search(value) {
    const users = await this.collection
      .find({ message: new RegExp(value, "i") })
      .lean()
      .sort({ createdAt: "desc" })
      .select("userId message _id createdAt")
      .exec();
    return users;
  }
}

module.exports = TweetRepository;
