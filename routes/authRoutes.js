const router = require("express").Router();
const container = require("../config/DIContainer");

const authService = container.cradle.authService;

router.get("/register", async function(req, res, next) {
  const user = req.body;
  res.json(await authService.register(user));
});

module.exports = router;
