const router = require("express").Router();
const container = require("../config/DIContainer");

const userService = container.cradle.userService;

router.get("/", async function(req, res, next) {
  const { _id: userId } = req.user;
  res.json(await userService.getFollowers({ userId }));
});

router.get("/timeline", async (req, res, next) => {
  const { _id: userId } = req.user;
  res.json(await userService.getFollowingTweets({ userId }));
});

router.post("/follow/:userToFollowId", async (req, res, next) => {
  const { userToFollowId } = req.params;
  const { _id: userId } = req.user;
  res.json(await userService.follow({ userToFollowId, userId }));
});

module.exports = router;
