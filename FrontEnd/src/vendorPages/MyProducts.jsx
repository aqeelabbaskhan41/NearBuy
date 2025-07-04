import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Main component to display and manage a user's product listings
function MyProducts() {
  const [products, setProducts] = useState([]); // Store the list of products
  const [loading, setLoading] = useState(true); // Track loading state while fetching data
  const [editingProduct, setEditingProduct] = useState(null); // Track which product is being edited
  const [editFormData, setEditFormData] = useState({
    productName: '',
    productPrice: '',
    productDescription: '',
    productCategory: ''
  }); // Form data for editing a product

  // Function to fetch products from the API
  async function getProducts() {
    const url = 'http://localhost:8080/vendor/products';
    const token = localStorage.getItem('token');

    // Check if a token exists, redirect to landing if not
    if (!token) {
      toast.error('No authentication token found', { position: 'top-right' });
      setLoading(false);
      window.location.href = '/landing';
      return;
    }

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Authorization': token, 'Content-Type': 'application/json' }
      });

      // Handle unauthorized or forbidden access (e.g., expired token)
      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401 || response.status === 403) {
          window.location.href = '/landing';
        }
        throw new Error(errorData.message || 'Failed to fetch products');
      }

      const data = await response.json();
      setProducts(Array.isArray(data) ? data : data.products || data.data || []);
    } catch (error) {
      toast.error(error.message || 'Error fetching products', { position: 'top-right' });
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  // Fetch products when the component mounts
  useEffect(() => {
    getProducts();
  }, []);

  // Handle deleting a product with confirmation
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    const url = `http://localhost:8080/vendor/products/${productId}`;
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: { 'Authorization': token, 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401 || response.status === 403) {
          window.location.href = '/landing';
        }
        throw new Error(errorData.message || 'Failed to delete product');
      }

      setProducts(products.filter(product => product._id !== productId));
      toast.success((await response.json()).message, { position: 'top-right' });
    } catch (error) {
      toast.error(error.message || 'Error deleting product', { position: 'top-right' });
    }
  };

  // Open the edit product modal with the selected product's details
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setEditFormData({
      productName: product.productName,
      productPrice: product.productPrice,
      productDescription: product.productDescription,
      productCategory: product.productCategory
    });
    setTimeout(() => {
      const modal = document.querySelector('#edit-modal');
      if (modal) modal.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  // Update the edit form data as the user types
  const handleEditFormChange = (e) => {
    setEditFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit the edited product data to the API
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8080/vendor/products/${editingProduct._id}`;
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Authorization': token, 'Content-Type': 'application/json' },
        body: JSON.stringify(editFormData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401 || response.status === 403) {
          window.location.href = '/landing';
        }
        throw new Error(errorData.message || 'Failed to update product');
      }

      setProducts(products.map(product =>
        product._id === editingProduct._id ? { ...product, ...editFormData } : product
      ));
      toast.success((await response.json()).message, { position: 'top-right' });
      setEditingProduct(null);
    } catch (error) {
      toast.error(error.message || 'Error updating product', { position: 'top-right' });
    }
  };

  // Format the product price in Pakistani Rupees
  const formatPrice = (price) =>
    new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', minimumFractionDigits: 0 })
      .format(price).replace('PKR', '₨');

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#b88e2f]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto relative">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">My Products</h1>
          <p className="text-gray-600">Manage your product listings</p>
        </div>

        {/* Render the edit product modal when a product is being edited */}
        {editingProduct && (
          <div id="edit-modal" className="absolute top-1/2 left-1/4 transform -translate-y-1/2 bg-white rounded-lg shadow-xl p-4 w-full max-w-md z-10">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Edit Product</h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="text-gray-500 hover:text-gray-700 hover:cursor-pointer"
              >
                <FiX size={20} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Product Name</label>
                <input
                  type="text"
                  name="productName"
                  value={editFormData.productName}
                  onChange={handleEditFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b88e2f]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Price (PKR)</label>
                <input
                  type="number"
                  name="productPrice"
                  value={editFormData.productPrice}
                  onChange={handleEditFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b88e2f]"
                  required
                  min="0"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Category</label>
                <input
                  type="text"
                  name="productCategory"
                  value={editFormData.productCategory}
                  onChange={handleEditFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b88e2f]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Description</label>
                <textarea
                  name="productDescription"
                  value={editFormData.productDescription}
                  onChange={handleEditFormChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b88e2f]"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 hover:cursor-pointer rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#b88e2f] text-white rounded-md hover:bg-[#a67d26] hover:cursor-pointer transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Display the product grid or a "no products" message */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-500">
                <div className="h-48 overflow-hidden">
                  <img
                    src={product.productPicture || 'https://via.placeholder.com/300'}
                    alt={product.productName}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/300'; }}
                  />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-800">{product.productName}</h3>
                    <span className="text-[#b88e2f] font-medium">{formatPrice(product.productPrice)}</span>
                  </div>
                  <div className="mt-1">
                    <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                      {product.productCategory}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-2">{product.productDescription}</p>
                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                    <div className="text-xs text-gray-500">
                      Added: {new Date(product.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex space-x-3">
                      <button
                        className="flex items-center text-sm text-[#b88e2f] hover:text-[#a67d26] hover:bg-[#f8dd98] hover:cursor-pointer transition-colors px-2 py-1 rounded"
                        onClick={() => handleEditClick(product)}
                      >
                        <FiEdit className="mr-1" /> Edit
                      </button>
                      <button
                        className="flex items-center text-sm text-red-500 hover:text-red-700 hover:bg-red-100 hover:cursor-pointer transition-colors px-2 py-1 rounded"
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        <FiTrash2 className="mr-1" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found</p>
            <button
              onClick={getProducts}
              className="mt-4 px-4 py-2 bg-[#b88e2f] text-white rounded-lg hover:bg-[#a67d26] hover:cursor-pointer transition-colors"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyProducts;