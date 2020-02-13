const mongoose = require("mongoose");
const logger = require("./logger");
const {
  dbHost,
  dbName,
  dbPass,
  dbPort,
  dbUser
} = require("./configurationKeys");

const url = `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
};

module.exports = mongoose
  .connect(url, options)
  .then(() => {
    logger.info("Database Connection Established");
  })
  .catch(err => logger.error(err));
