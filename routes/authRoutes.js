const router = require("express").Router();
const { celebrate } = require("celebrate");
const container = require("../config/DIContainer");
const { validate } = require("./validation/index");

const authService = container.cradle.authService;

router.post(
  "/register",
  celebrate(validate.auth.register),
  async (req, res, next) => {
    const user = req.body;
    res.json(await authService.register(user));
  }
);

router.post(
  "/login",
  celebrate(validate.auth.login),
  async (req, res, next) => {
    const { loginId, password } = req.body;
    res.json(await authService.login(loginId, password));
  }
);

module.exports = router;
