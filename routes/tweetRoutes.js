const router = require("express").Router();
const { celebrate } = require("celebrate");
const container = require("../config/DIContainer");
const { validate } = require("./validation/index");

const tweetService = container.cradle.tweetService;

router.post(
  "/",
  celebrate(validate.tweet.postTweet),
  async (req, res, next) => {
    const { message } = req.body;
    const { id } = req.user;

    return res.json(await tweetService.postTweet(message, id));
  }
);

router.get("/:tweetId", async (req, res, next) => {
  const { tweetId } = req.params;
  return res.json(await tweetService.getTweet(tweetId));
});

router.post(
  "/:tweetId/replies",
  celebrate(validate.tweet.replyTweet),
  async (req, res) => {
    const { tweetId } = req.params;
    const { message } = req.body;
    const { id } = req.user;

    return res.json(await tweetService.replyTweet(tweetId, message, id));
  }
);

router.post(
  "/search",
  celebrate(validate.tweet.searchTweet),
  async (req, res, next) => {
    const { searchValue } = req.body;
    res.json(await tweetService.search(searchValue));
  }
);

module.exports = router;
