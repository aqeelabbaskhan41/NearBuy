const Vendor = require('../Models/Vendors');
const Product = require('../Models/Products');

const getVendorsWithProducts = async (req, res) => {
  try {
    // Get all vendors excluding sensitive fields
    const vendors = await Vendor.find({})
      .select('-password -__v -createdAt -updatedAt')
      .lean();

    if (!vendors || vendors.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No vendors found'
      });
    }

    // Get products for each vendor
    const vendorsWithProducts = await Promise.all(
      vendors.map(async (vendor) => {
        const products = await Product.find({ vendorId: vendor._id })
          .select('-__v -createdAt -updatedAt')
          .lean();

        return {
          ...vendor,
          products: products || []
        };
      })
    );

    res.status(200).json({
      success: true,
      count: vendorsWithProducts.length,
      data: vendorsWithProducts
    });

  } catch (error) {
    console.error('Error fetching vendors with products:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = getVendorsWithProducts;