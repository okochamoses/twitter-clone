const redis = require("redis");
const { redisUrl } = require("./configurationKeys");
const client = redis.createClient({ url: redisUrl });
const logger = require("./logger");

client.on("error", function(error) {
  logger.error("REDIS ERROR: ", error.message);
});

module.exports = client;
