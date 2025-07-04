const Product = require("../Models/Products");

const getProducts = async (req, res) => {
  try {
    const vendorId =req.vendor.id;
    // Fetch products for the authenticated vendor
    const products = await Product.find({ vendorId: vendorId });

    if (products.length === 0) {
      return res.status(200).json({
        message: 'No products found for this vendor',
        vendor: req.vendor,
        data: [],
      });
    }

    res.status(200).json({
      message: 'Products retrieved successfully',
      vendor: req.vendor,
      data: products,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid vendor ID format' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = getProducts;