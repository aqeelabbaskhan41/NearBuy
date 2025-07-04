const { string, required } = require("joi");
const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    business_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    business_address: {
      type: String,
    },
    location: {
      type: [Number],
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    buisness_catagory: {
      type: String,
      required: true,
    },
    business_description: {
      type: String,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

const Vendor = mongoose.model("vendors", vendorSchema);
module.exports = Vendor;
