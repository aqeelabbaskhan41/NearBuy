const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to Vendor model
      ref: "vendors", // ref to vendor model
      required: true,
    },
    productName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
      trim: true,
    },
    productPrice: {
      type: Number,
      required: true,
      min: [0.01, "Price must be a positive number"],
    },
    productDescription: {
      type: String,
      required: true,
      maxlength: 1000,
      default: "",
      trim: true,
    },
    productPicture: {
      type: String,
      default: "",
      trim: true,
    },
    productCategory: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;