const Product = require("../Models/Products");

const addProduct = async (req, res) => {
  const { productName, productPrice, productDescription, productCategory } = req.body;

  try {
    // Generate image link if an image was uploaded
    const imageLink = req.file
      ? `${req.protocol}://${req.get("host")}/image/${req.file.filename}`
      : ""; // Empty string if no image

    const product = await Product.create({
      vendorId: req.vendor.id, // From JWT middleware
      productName,
      productPrice,
      productDescription,
      productPicture: imageLink, // Store the generated image link
      productCategory,
    });

    res.status(201).json({
      message: "Product added",
      vendor: req.vendor, // Include decoded JWT data
      data: product,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = addProduct;