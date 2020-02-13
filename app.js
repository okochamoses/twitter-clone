const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();
require("./config/database"); // Initialize connection to database

const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users/", userRouter);
app.use("/api/auth/", authRouter);

module.exports = app;
