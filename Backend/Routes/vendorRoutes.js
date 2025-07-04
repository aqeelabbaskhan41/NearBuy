const route = require("express").Router();
const { vendorSignup, vendorLogin } = require("../Middlewares/vendorAuth");
const { signup, login } = require("../Controllers/vendorAuthController");

route.post("/signup", vendorSignup, signup);

route.post("/login", vendorLogin, login);


module.exports = route;
