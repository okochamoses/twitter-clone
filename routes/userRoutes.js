const router = require("express").Router();
const container = require("../config/DIContainer");

const userService = container.cradle.userService;

router.get("/:userId", async function(req, res, next) {
  const { userId } = req.params;
  res.send(await userService.getFollowers({ userId }));
});

module.exports = router;
