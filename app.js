const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
require("dotenv").config();
const errorHandler = require("./config/errorHandler");
require("./config/database"); // Initialize connection to database
require("./config/passport");

const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const tweetRouter = require("./routes/tweetRoutes");
const authMiddleware = passport.authenticate("jwt", { session: false });

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/users/", authMiddleware, userRouter);
app.use("/api/auth/", authRouter);
app.use("/api/tweets/", authMiddleware, tweetRouter);
app.use(errorHandler);

module.exports = app;
