const vendor = require("../Models/Vendors");
const { hash, compare } = require("bcrypt");
const jwt = require("jsonwebtoken");

// signup handler
const signup = async (req, res) => {
  const {
    business_name,
    email,
    password,
    business_address,
    location,
    phone_number,
    buisness_catagory,
    business_description,
  } = req.body;
  try {
    const existingVendor = await vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({
        message: "Vendor already exists",
      });
    }
    const hashedPassword = await hash(password, 10);
    const newVendor = await vendor.create({
      business_name,
      email,
      password: hashedPassword,
      business_address,
      location,
      phone_number,
      buisness_catagory,
      business_description,
    });
    res.status(201).json({
      message: "vendor profile created successfully",
      vendor: {
        id: newVendor._id,
        business_name: newVendor.business_name,
        email: newVendor.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// login handler

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingVendor = await vendor.findOne({ email });
    if (!existingVendor) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }
    const isPasswordCorrect = await compare(password, existingVendor.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }
    const jwtToken = jwt.sign(
      {
        id: existingVendor._id,
        business_name: existingVendor.business_name,
        email: existingVendor.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30m" }
    );

    res.status(200).json({
      message: "Login Successful",
      vendor: {
        id: existingVendor._id,
        business_name: existingVendor.business_name,
        email: existingVendor.email,
      },
      jwtToken,
      role: "vendor",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  signup,
  login,
};
