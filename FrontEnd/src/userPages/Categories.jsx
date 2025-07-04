import React from "react";
import { FaShoppingBasket, FaTshirt, FaMobileAlt, FaHome, FaSmile, FaSeedling, FaBookOpen, FaTools, FaArrowRight, FaStore } from "react-icons/fa";


function CategoriesPage() {
  const categories = [
    { id: 1, name: "Electronics", icon: <FaMobileAlt />, products: 245 },
    { id: 2, name: "Fashion", icon: <FaTshirt />, products: 892 },
    { id: 3, name: "Home & Living", icon: <FaHome />, products: 567 },
    { id: 4, name: "Beauty", icon: <FaSmile />, products: 321 },
    { id: 5, name: "Groceries", icon: <FaSeedling />, products: 1045 },
    { id: 6, name: "Books", icon: <FaBookOpen />, products: 189 },
    { id: 7, name: "DIY & Tools", icon: <FaTools />, products: 432 },
    { id: 8, name: "Other", icon: <FaShoppingBasket />, products: 678 },
  ];

  const featuredShops = [
    { id: 1, name: "City Electronics", location: "Downtown", category: "Electronics" },
    { id: 2, name: "Fashion Hub", location: "Mall Road", category: "Fashion" },
    { id: 3, name: "Fresh Mart", location: "Gulberg", category: "Groceries" },
    { id: 4, name: "Book Palace", location: "Academic Zone", category: "Books" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#b88e2f] mb-2">
            Explore Categories
          </h1>
          <p className="text-gray-600 md:text-lg">
            Discover local products from various categories
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search categories..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b88e2f] focus:border-[#b88e2f] outline-none transition-all duration-300"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaShoppingBasket className="text-gray-400 text-xl" />
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="bg-[#f8f4ed] p-3 rounded-lg text-[#b88e2f] text-2xl">
                  {category.icon}
                </div>
                <h3 className="ml-4 text-xl font-semibold text-gray-800">
                  {category.name}
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                {category.products.toLocaleString()} products available
              </p>
              <button className="w-full flex items-center justify-center py-2 px-4 border border-[#b88e2f] text-[#b88e2f] rounded-lg hover:bg-[#b88e2f] hover:text-white transition-colors duration-300">
                Explore Shops
                <FaArrowRight className="ml-2" />
              </button>
            </div>
          ))}
        </div>

        {/* Featured Shops */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-12">
          <h2 className="text-2xl font-bold text-[#b88e2f] mb-6 flex items-center">
            <FaStore className="mr-2" />
            Featured Local Shops
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredShops.map((shop) => (
              <div
                key={shop.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-[#b88e2f] transition-colors duration-300"
              >
                <h3 className="font-semibold text-gray-800 mb-1">{shop.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{shop.location}</p>
                <span className="inline-block bg-[#f8f4ed] text-[#b88e2f] text-xs px-2 py-1 rounded">
                  {shop.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r bg-gray-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-[#b88e2f] mb-4">
            Get Local Updates
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Subscribe to our newsletter for exclusive deals, new arrivals, and
            special offers from local shops
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b88e2f] focus:border-[#b88e2f] outline-none"
            />
            <button className="whitespace-nowrap bg-gradient-to-r from-[#b88e2f] to-[#d4a73f] text-white px-6 py-2 rounded-lg hover:from-[#9a7827] hover:to-[#b88e2f] transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage;