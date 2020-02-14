const router = require("express").Router();
const container = require("../config/DIContainer");

const tweetService = container.cradle.tweetService;

router.post("/", async (req, res, next) => {
  const { message } = req.body;
  const { id } = req.user;

  return res.json(await tweetService.postTweet(message, id));
});

router.post("/:tweetId/replies", async (req, res) => {
  const { tweetId } = req.params;
  const { message } = req.body;
  const { id } = req.user;

  return res.json(await tweetService.replyTweet(tweetId, message, id));
});

router.post("/search", async (req, res, next) => {
  const { searchValue } = req.body;
  res.json(await tweetService.search(searchValue));
});

module.exports = router;
