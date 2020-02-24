const socket_io = require("socket.io");
const io = socket_io();
const socketApi = {};
const logger = require("./config/logger");

socketApi.io = io;

io.on("connection", function(socket) {
  logger.info("A user connected");
});

module.exports = socketApi;
