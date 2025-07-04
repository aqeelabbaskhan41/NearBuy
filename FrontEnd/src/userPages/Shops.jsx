import React, { useState, useEffect } from "react";
import {
  FaStore,
  FaMapMarkerAlt,
  FaPhone,
  FaTimes,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";

// Price formatting function
const formatPrice = (price) => {
  return `Rs ${price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

function Shops() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);

  useEffect(() => {
    const fetchVendors = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          "http://localhost:8080/user/vendors/products",
          {
            method: "GET",
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message || "Failed to fetch vendors");
        }

        setVendors(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  const openModal = (vendor) => {
    setSelectedVendor(vendor);
  };

  const closeModal = () => {
    setSelectedVendor(null);
  };

  if (loading)
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#b88e2f] mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading shops...</p>
      </div>
    );

  if (error)
    return <div className="text-center py-12 text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white min-h-screen relative">
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-10 text-[#b88e2f]">
          All Shops & Vendors
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <div
              key={vendor._id}
              className="bg-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 transform-gpu cursor-pointer"
              onClick={() => openModal(vendor)}
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FaStore className="text-[#b88e2f] text-xl" />
                  <h3 className="text-xl font-semibold">
                    {vendor.business_name}
                  </h3>
                </div>

                <div className="space-y-2 text-gray-800 mb-4">
                  <div className="flex items-start gap-2">
                    <FaMapMarkerAlt className="text-[#b88e2f] mt-1" />
                    <p>{vendor.business_address}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-[#b88e2f]" />
                    <p>{vendor.phone_number}</p>
                  </div>
                  <div className="inline-block border-2 border-[#b88e2f] text-black px-3 py-1 rounded-full text-sm">
                    {vendor.buisness_catagory}
                  </div>
                </div>

                <div className="w-full bg-[#b88e2f] text-white py-2 rounded-lg text-center">
                  View Products ({vendor.products.length})
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Products Modal */}
      {selectedVendor && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div
            className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col border-2 border-[#b88e2f] transform-gpu transition-all duration-300 hover:scale-105"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b p-4 bg-[#b88e2f] text-white">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <FaStore />
                {selectedVendor.business_name}'s Products
              </h3>
              <button
                onClick={closeModal}
                className="text-white hover:text-gray-200 transition-colors cursor-pointer"
              >
                <FaTimes />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4">
              {selectedVendor.products.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  No products available
                </p>
              ) : (
                <div className="flex flex-wrap gap-4 justify-center">
                  {selectedVendor.products.map((product) => (
                    <div
                      key={product._id}
                      className="border rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 hover:scale-105 transform-gpu cursor-pointer min-w-[250px] max-w-[300px] flex-1"
                    >
                      <div className="h-48 bg-gray-100 overflow-hidden">
                        <img
                          src={
                            product.productPicture ||
                            "https://via.placeholder.com/300x200?text=No+Image"
                          }
                          alt={product.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-md">
                          {product.productName}
                        </h4>
                        {/* Updated price display with smaller text size */}
                        <p className="text-[#b88e2f] font-medium text-md my-2">
                          {formatPrice(product.productPrice)}
                        </p>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                          {product.productDescription}
                        </p>
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {product.productCategory}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t p-4 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-[#b88e2f] text-white rounded hover:bg-[#a07a26] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Shops;
