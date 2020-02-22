const container = require("../config/DIContainer");
const inMemoryDBService = container.cradle.inMemoryDBService;

module.exports = (req, res, next) => {
  const user = req.user;
  inMemoryDBService.setWithTimeout(user.id, user.username);
  next();
};
