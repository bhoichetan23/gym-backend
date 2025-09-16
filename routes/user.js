const express = require("express");

const userRouter = express.Router();

const { signUp, login, logout } = require("../controllers/user.js");

userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

module.exports = userRouter;
