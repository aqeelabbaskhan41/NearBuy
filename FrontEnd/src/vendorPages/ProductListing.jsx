import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductListing() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    productDescription: "",
    productCategory: "Electronics", // Default category
    productPicture: null,
  });
  const navigate = useNavigate();

  const categories = [
    "Electronics",
    "Grocery",
    "Clothing",
    "Home & Garden",
    "Beauty",
    "Sports",
    "Books",
    "Shoes",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      productPicture: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/landing");
      setIsLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("productName", formData.productName);
      formDataToSend.append("productPrice", formData.productPrice);
      formDataToSend.append("productDescription", formData.productDescription);
      formDataToSend.append("productCategory", formData.productCategory);
      if (formData.productPicture) {
        formDataToSend.append("image", formData.productPicture);
      }

      const response = await fetch("http://localhost:8080/vendor/products", {
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
        body: formDataToSend,
      });
      

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add product");
      }

      const result = await response.json();
      toast.success(result.message, {
        position: "top-right",
        autoClose: 2000,
        onClose: () => navigate("/vendor/my-products"), // Navigate after toast closes
      });


      // Reset form after successful submission
      setFormData({
        productName: "",
        productPrice: "",
        productDescription: "",
        productCategory: "Electronics",
        productPicture: null,
      });

      // Clear file input
      document.getElementById("image-upload").value = "";
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4 sm:p-6">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md">
        {/* Header */}
        <div className="bg-[#b88e2f] rounded-t-xl px-4 py-3">
          <h1 className="font-semibold text-xl text-white text-center">
            List Your Product
          </h1>
        </div>

        <div className="p-5 sm:p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label
                    htmlFor="productName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="productName"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#b88e2f] focus:border-[#b88e2f]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="productPrice"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Price (PKR) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500 text-sm">
                      ₨
                    </span>
                    <input
                      type="number"
                      id="productPrice"
                      name="productPrice"
                      value={formData.productPrice}
                      onChange={handleChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full pl-8 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#b88e2f] focus:border-[#b88e2f]"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="productDescription"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="productDescription"
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#b88e2f] focus:border-[#b88e2f]"
                  placeholder="Product details..."
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label
                    htmlFor="productCategory"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="productCategory"
                    name="productCategory"
                    value={formData.productCategory}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#b88e2f] focus:border-[#b88e2f]"
                    required
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Product Image <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col w-full border border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                        {formData.productPicture ? (
                          <>
                            <svg
                              className="w-8 h-8 text-green-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <p className="text-xs text-gray-500 mt-2 text-center">
                              {formData.productPicture.name}
                            </p>
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-8 h-8 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                            <p className="text-xs text-gray-500 mt-2 text-center">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                              PNG, JPG up to 5MB
                            </p>
                          </>
                        )}
                      </div>
                      <input
                        id="image-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept="image/png, image/jpeg"
                        required
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-2.5 px-4 text-sm font-medium rounded-lg text-white bg-[#b88e2f] hover:bg-[#a67d26] hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b88e2f] ${
                    isLoading ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <FaSpinner className="animate-spin mr-2" />
                      Processing...
                    </span>
                  ) : (
                    "Add Product"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductListing;
