const MongooseRepository = require("./MongooseRepository");
const User = require("../models/User");

class UserRepository extends MongooseRepository {
  constructor() {
    super({ model: User });
  }

  async getFollowers({ userId }) {
    const user = await this.collection
      .findOne({ _id: userId })
      .lean()
      .select("username followers fullName")
      .populate("followers", "_id username fullName")
      .exec();
    return user;
  }

  async getFollowing({ userId }) {
    const user = await this.collection
      .findOne({ _id: userId })
      .lean()
      .select("username following")
      .populate("following", "_id username fullName")
      .exec();
    return user;
  }

  async search(value) {
    const users = await this.collection
      .find({ username: new RegExp(value, "i") })
      .lean()
      .select("username fullName _id")
      .exec();
    return users;
  }

  async getUser({ userId }) {
    const user = await this.collection
      .findById(userId)
      .lean()
      .select("username fullName email following followers")
      .populate("following", "username fullName")
      .populate("followers", "username fullName")
      .exec();
    return user;
  }
}

module.exports = UserRepository;
