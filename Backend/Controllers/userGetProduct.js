const Product = require("../Models/Products");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({})
        .select('-__v') // Exclude version field
    //   .populate('vendorId', 'business_name email'); // Include vendor details

    if (products.length === 0) {
      return res.status(200).json({
        message: "No products found",
        user: req.user,
        data: [],
      });
    }

    res.status(200).json({
      message: "Products retrieved successfully",
      user: req.user,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = getAllProducts;
