const Product = require("../Models/Products");


const deleteProduct = async (req, res) => {
  const { id } = req.params; // Destructure product ID from req.params
  const vendorId = req.vendor?.id; // Get vendor ID from authenticated vendor (from JWT)

  try {
    // Find the product by ID
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Log for debugging
    // console.log('Product vendorId:', product.vendorId.toString());
    // console.log('Authenticated vendorId:', vendorId);

    // Check if the product's vendorId matches the authenticated vendor's ID
    if (product.vendorId.toString() !== vendorId) {
      return res
        .status(403)
        .json({
          message: "Unauthorized: You are not allowed to delete this product",
        });
    }

    // Delete the product
    await Product.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = deleteProduct;
