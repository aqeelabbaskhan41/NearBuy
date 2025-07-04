const route = require("express").Router();
const { userSignup, userLogin } = require("../Middlewares/userAuth");
const { signup, login } = require("../Controllers/userAuthController");

route.post("/signup", userSignup, signup);

route.post("/login", userLogin, login);

module.exports = route;
