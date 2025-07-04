import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeroSec from "../components/HeroSec";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found. Please log in.");
        setTimeout(() => navigate("/login"), 2000);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/user/products", {
          method: "GET",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 401) {
          setError("Session expired. Redirecting to login...");
          localStorage.removeItem("token"); // Clear invalid token
          setTimeout(() => navigate("/login"), 2000);
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message || "An error occurred while fetching products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [navigate]);

  // Format price in PKR format
  const formatPrice = (price) => {
    return `Rs ${price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <>
      <HeroSec />
      <section className="bg-gray-50 py-12 min-h-screen">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-[#b88e2f]">
            Featured Products
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md text-center max-w-3xl mx-auto">
              {error}
            </div>
          )}

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-500"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={
                        product.productPicture ||
                        "https://via.placeholder.com/300"
                      }
                      alt={product.productName}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300";
                      }}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {product.productName}
                      </h3>
                      <span className="text-[#b88e2f] font-medium">
                        {formatPrice(product.productPrice)}
                      </span>
                    </div>
                    <div className="mt-1">
                      <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                        {product.productCategory}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                      {product.productDescription}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">No products available</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;