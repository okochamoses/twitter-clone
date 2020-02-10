const mongoose = require('mongoose');
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
    useNewUrlParser: true
}

module.exports = mongoose
  .connect(url, options)
  .then(() => {
    console.log("Database Connection Established");
  })
  .catch(err => console.log(err));
