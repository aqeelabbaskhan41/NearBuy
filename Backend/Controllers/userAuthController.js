const User = require("../Models/Users");
const { hash, compare } = require("bcrypt");
const jwt = require("jsonwebtoken");

// signup
const signup = async (req, res) => {
  const { user_name, email, password, phone_number } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const hashedPassword = await hash(password, 10);
    const newUser = await User.create({
      user_name,
      email,
      password: hashedPassword,
      phone_number,
    });
    res.status(201).json({
      message: "User account created successfully",
      user: {
        id: newUser._id,
        user_name: newUser.user_name,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }
    const isPasswordCorrect = await compare(password, userExists.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }
    const jwtToken = jwt.sign(
      {
        id: userExists._id,
        user_name: userExists.user_name,
        email: userExists.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30m",
      }
    );
    res.status(200).json({
      message: "Login successfully",
      user: {
        id: userExists._id,
        user_name: userExists.user_name,
        email: userExists.email,
      },
      jwtToken,
      role: "user",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  signup,
  login,
};
