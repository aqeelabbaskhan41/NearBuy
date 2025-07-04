import React, { useState } from "react";
import {
  FaArrowRight,
  FaMapMarkerAlt,
  FaPhone,
  FaStore,
  FaFilter,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";

function HeroSec() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState("prompt");
  const [expandedProduct, setExpandedProduct] = useState(null);

  // Request user location
  const requestLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationPermission("granted");
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationPermission("denied");
          setError(
            "Location access denied. Showing all results without distance."
          );
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  };

  // Search products
  const searchProducts = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const url = `http://localhost:8080/user/products/search?productName=${encodeURIComponent(
        searchQuery
      )}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: userLocation ? JSON.stringify({ userLocation }) : "{}",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      setProducts(data.data || []);
      setExpandedProduct(null);
    } catch (err) {
      console.error("Search error:", err);
      setError(err.message || "Failed to search products. Please try again.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchProducts();
  };

  const toggleProductDetails = (productId) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen pt-12 px-4 pb-8 bg-white">
      {/* Main Content */}
      <div
        className={`z-10 w-full ${
          products.length > 0 ? "max-w-7xl" : "max-w-3xl"
        } text-center`}
      >
        {products.length === 0 && (
          <>
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 z-0 hidden md:block">
              <img
                src="/images/Hero Sec Image.svg"
                alt="Hero Section"
                width={420}
                height={300}
                className="object-contain"
              />
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold mb-6 px-2 sm:px-0 leading-snug">
              Find nearest <span className="text-[#b88e2f]">shops</span> and{" "}
              <span className="text-[#b88e2f]">products</span> here..
            </h1>
          </>
        )}

        {/* Search Bar */}
        <div className="w-full max-w-3xl mx-auto">
          <form
            onSubmit={handleSearch}
            className="relative w-full mx-auto px-2"
          >
            <div className="flex gap-2">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products or shops"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-[#b88e2f] sm:px-4 sm:py-2.5 sm:text-base"
              />
              <button
                type="submit"
                className="bg-[#b88e2f] text-white rounded-md px-4 py-2 text-sm hover:bg-[#a07a26] transition flex items-center sm:px-5 sm:text-base"
                disabled={loading}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-4 w-4 text-white sm:h-5 sm:w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <>
                    <FaArrowRight className="mr-1 text-sm sm:text-base" />
                    Search
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Location permission button */}
          {locationPermission !== "granted" && products.length === 0 && (
            <div className="mt-4 flex flex-col items-center space-y-2">
              <button
                onClick={requestLocation}
                disabled={loading || locationPermission === "denied"}
                className={`px-4 py-2 rounded-md text-sm transition-colors ${
                  locationPermission === "denied"
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#b88e2f] text-white hover:bg-[#a07a26]"
                }`}
              >
                {locationPermission === "denied"
                  ? "Location Access Denied"
                  : "Use My Current Location"}
              </button>

              {userLocation && (
                <p className="text-sm text-green-600 mt-1">
                  Location enabled! Results will show distance.
                </p>
              )}
            </div>
          )}

          {/* Quote Below Search - only shown when no results */}
          {products.length === 0 && (
            <p className="mt-6 px-4 text-base sm:text-lg">
              <span className="text-black font-semibold">"Great products</span>{" "}
              <span className="text-[#b88e2f] font-semibold">
                start with great shops."
              </span>
            </p>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md max-w-3xl mx-auto">
            {error}
          </div>
        )}

        {/* Search results */}
        {products.length > 0 && (
          <div className="mt-8 w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {products.length}{" "}
                {products.length === 1 ? "Product Found" : "Products Found"}
              </h2>
              {userLocation && (
                <div className="flex items-center text-sm bg-gray-100 text-[#b88e2f] px-3 py-1 rounded-full">
                  <FaMapMarkerAlt className="mr-1" />
                  Showing distance from your location
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-gray-100 rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative h-48 sm:h-56">
                    <img
                      src={
                        product.productPicture ||
                        "https://via.placeholder.com/400x300?text=No+Image"
                      }
                      alt={product.productName}
                      className="w-full h-full object-cover"
                    />
                    {product.distance !== null && (
                      <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-semibold shadow-sm flex items-center">
                        <FaMapMarkerAlt className="text-[#b88e2f] mr-1" />
                        {product.distance.toFixed(1)} km
                      </div>
                    )}
                  </div>
                  <div className="p-4 sm:p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {product.productName}
                      </h3>
                      <div className="flex items-center text-md  text-[#b88e2f]">
                        ₨ {product.productPrice}
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.productDescription}
                    </p>
                    <div className="text-xs text-gray-500 mb-2">
                      Category: {product.productCategory}
                    </div>

                    {/* Vendor details section */}
                    <div
                      className={`border-t border-gray-200 pt-3 mt-3 ${
                        expandedProduct === product._id ? "block" : "hidden"
                      }`}
                    >
                      <div className="flex items-center text-sm text-gray-700 mb-2">
                        <FaStore className="mr-2 text-[#b88e2f]" />
                        <span className="font-medium">
                          {product.vendorDetails?.name}
                        </span>
                      </div>
                      <div className="flex items-start text-sm text-gray-600 mb-2">
                        <FaMapMarkerAlt className="mr-2 mt-1 flex-shrink-0 text-[#b88e2f]" />
                        <span>{product.vendorDetails?.address}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <FaPhone className="mr-2 text-[#b88e2f]" />
                        <a
                          href={`tel:${product.vendorDetails?.phone}`}
                          className="hover:text-[#b88e2f] transition-colors"
                        >
                          {product.vendorDetails?.phone}
                        </a>
                      </div>
                    </div>

                    {/* Show details button */}
                    <button
                      onClick={() => toggleProductDetails(product._id)}
                      className="w-full mt-3 text-sm text-[#b88e2f] hover:text-[#a07a26] hover:cursor-pointer flex items-center justify-center text-center"
                    >
                      {expandedProduct === product._id ? (
                        <>
                          <FaChevronUp className="mr-1" size={12} />
                          Hide Details
                        </>
                      ) : (
                        <>
                            <FaChevronDown className="mr-1" size={12} />
                            Show Details
                          </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No results message */}
        {products.length === 0 && searchQuery && !loading && !error && (
          <div className="mt-8 p-4 bg-gray-100 rounded-md max-w-3xl mx-auto">
            <p>No products found matching your search.</p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-2 text-sm text-[#b88e2f] hover:underline transition-colors"
            >
              Clear search and try again
            </button>
          </div>
        )}

        {/* Mobile illustration */}
        {products.length === 0 && (
          <div className="mt-8 block md:hidden">
            <img
              src="/images/Hero Sec Image.svg"
              alt="Hero Section Mobile"
              width={280}
              height={300}
              className="mx-auto object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default HeroSec;