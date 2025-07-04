const route = require("express").Router();
const isUser = require("../Middlewares/isUser");
const getAllProducts = require("../Controllers/userGetProduct");
const searchProducts = require("../Controllers/userSearchProduct");
const getVendorsWithProducts = require("../Controllers/getVendorswithProducts");
// Route to get all products
route.get("/products", isUser, getAllProducts);

// Route for searching and filtering products
route.post("/products/search", isUser, searchProducts);
route.get("/vendors/products", isUser, getVendorsWithProducts);

module.exports = route;
