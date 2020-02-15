const router = require("express").Router();
const { celebrate } = require("celebrate");
const container = require("../config/DIContainer");
const { validate } = require("./validation/index");

const userService = container.cradle.userService;

router.get("/", async (req, res, next) => {
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

router.post(
  "/search",
  celebrate(validate.user.search),
  async (req, res, next) => {
    const { searchValue } = req.body;
    res.json(await userService.search(searchValue));
  }
);

module.exports = router;
