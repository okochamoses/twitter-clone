const winston = require("winston");

const options = {
  file: {
    level: "info",
    filename: "logger.log",
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5
  },
  console: {
    level: "debug",
    handleExceptions: true
  }
};

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "dd-MM-YYYY HH:mm:ss" }),
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ]
});

module.exports = logger;
