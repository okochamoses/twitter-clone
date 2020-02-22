const redis = require("redis");
const { redisUrl } = require("./configurationKeys");
const client = redis.createClient({ url: redisUrl });

client.on("error", function(error) {
  console.error(error);
});

client.set("key", "value", redis.print);

client.get("5e45b8d504ff3d718a7aa1dd", (err, reply) => {
  if (err) console.log(err);
  console.log(reply);
});

module.exports = client;
