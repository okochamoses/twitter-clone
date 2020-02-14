const router = require("express").Router();
const container = require("../config/DIContainer");

const authService = container.cradle.authService;

router.post("/register", async function(req, res, next) {
  const user = req.body;
  res.json(await authService.register(user));
});

router.post("/login", async function(req, res, next) {
  const { loginId, password } = req.body;
  res.json(await authService.login(loginId, password));
});

module.exports = router;
