const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
  message: {
    type: String,
    required: true,
    maxlength: 200
  },
  createdAt: {
    type: String,
    default: new Date()
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  replies: [{ type: Schema.Types.ObjectId, ref: "Tweet" }]
});

module.exports = mongoose.model("Tweet", tweetSchema);
