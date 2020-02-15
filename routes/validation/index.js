const auth = require("./auth");
const tweet = require("./tweet");
const user = require("./user");

module.exports = {
  validate: {
    auth,
    tweet,
    user
  }
};
