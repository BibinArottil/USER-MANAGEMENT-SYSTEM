// const { Router } = require("express");
const express = require("express");
const UserRouter = require("../Controllers/userController");
const user_route = express.Router();

user_route.get("/", UserRouter.UserLogin);

user_route.post("/", UserRouter.UserVerification);

user_route.get("/signup", UserRouter.UserSignup);

user_route.post("/signup", UserRouter.InsertUser);

user_route.get("/userhome", UserRouter.UserHome);

user_route.get("/userlogout", UserRouter.UserLogout);

module.exports = user_route;
