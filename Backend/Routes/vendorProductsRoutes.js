const route = require("express").Router();
const vendorAuth = require("../Middlewares/addProductsAuth");
const validateProduct = require("../Middlewares/validateProduct");
const { storeImg } = require("../Middlewares/storeImg");
const addProduct = require("../Controllers/addProductController");
const getProducts = require("../Controllers/getProductController");
const updateProduct = require("../Controllers/updateProductController");
const deleteProduct = require("../Controllers/deleteProduct");
const multer = require("multer");

// Multer error handling middleware
const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: `Multer error: ${err.message}` });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
};

// Add new products
route.post("/products", vendorAuth, storeImg, multerErrorHandler, validateProduct, addProduct);

// Show own products
route.get("/products", vendorAuth, getProducts);

// Product update
route.put("/products/:id", vendorAuth, validateProduct, updateProduct);

// Delete product
route.delete("/products/:id", vendorAuth, deleteProduct);

module.exports = route;