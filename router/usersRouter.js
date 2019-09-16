var express = require("express");
var fs = require('fs');
var users = JSON.parse(fs.readFileSync("./data/user.json"))

var usersRouter = express.Router();

const {getAllUsers, getUser, deleteUser, updateUser, createUser} = require("./../controller/userController");
const {userLogin,userSignup,forgotPassword,resetPassword,userLogout,protectRoute,updatePass} = require("../controller/authController");

usersRouter
  .route("/")
  .get(getAllUsers)
  .post(createUser)
usersRouter
.route("/login")
.post(userLogin)

usersRouter
.route("/logout")
.get(userLogout)

usersRouter
.route("/signup")
.post(userSignup)

usersRouter
.patch("/update",protectRoute,updateUser);
usersRouter
.patch("/updatePassword",protectRoute,updatePass);

usersRouter.route("/forgotPassword").post(forgotPassword);
usersRouter.route("/resetPassword/:token").patch(resetPassword);


usersRouter
.route("/:id")
.get(getUser)
.patch(updateUser)
.delete(deleteUser)

module.exports = usersRouter;