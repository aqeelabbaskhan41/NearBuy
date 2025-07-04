const Product = require("../Models/Products");
const calculateDistance = require("../utils/distance");

/**
 * Search products with optional filters and distance-based sorting
 */
const searchProducts = async (req, res) => {
  try {
    const { productName } = req.query;
    const { userLocation } = req.body;
    // Validate user location if provided
    if (userLocation) {
      const { latitude, longitude } = userLocation;
      if (
        typeof latitude !== "number" ||
        isNaN(latitude) ||
        typeof longitude !== "number" ||
        isNaN(longitude)
      ) {
        return res.status(400).json({
          success: false,
          message: "Latitude and longitude must be valid numbers",
        });
      }
    }

    // Build product query with optional filters
    const query = {};
    if (productName) query.productName = { $regex: productName, $options: "i" };

    // Fetch products and their vendor details
    const products = await Product.find(query)
      .select("-__v")
      .populate(
        "vendorId",
        "business_name email location business_address phone_number buisness_catagory business_description"
      );

    // Map and process results
    const processedProducts = products.map((product) => {
      const vendor = product.vendorId;
      let distance = null;

      if (
        userLocation &&
        Array.isArray(vendor?.location) &&
        vendor.location.length === 2 &&
        typeof vendor.location[0] === "number" &&
        typeof vendor.location[1] === "number"
      ) {
        try {
          distance = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            vendor.location[0],
            vendor.location[1]
          );
        } catch (err) {
          console.warn(
            `Distance calculation error for vendor ${vendor._id}: ${err.message}`
          );
        }
      }

      return {
        ...product.toObject(),
        distance,
        vendorDetails: {
          name: vendor.business_name || "Unknown",
          address: vendor.business_address || "Not provided",
          category: vendor.buisness_catagory || "Not specified",
          phone: vendor.phone_number || "Not provided",
        },
      };
    });

    // Sort by distance if location was provided
    if (userLocation) {
      processedProducts.sort((a, b) => {
        if (a.distance == null && b.distance == null) return 0;
        if (a.distance == null) return 1;
        if (b.distance == null) return -1;
        return a.distance - b.distance;
      });
    }

    const response = {
      success: true,
      message:
        processedProducts.length > 0
          ? "Products found"
          : "No matching products",
      count: processedProducts.length,
      data: processedProducts,
    };

    if (userLocation) {
      response.userLocation = {
        coordinates: [userLocation.latitude, userLocation.longitude],
        note: "Distances shown are in kilometers from your location",
      };
    }

    res.status(200).json(response);
  } catch (error) {
    console.error("Error during product search:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error during product search",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = searchProducts;
