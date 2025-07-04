import React from "react";
import { Route, Routes } from "react-router-dom";

// Layouts and pages
import Layout from "./Layout";
import VendorLayout from "./VendorLayout";
import Home from "./userPages/Home";
import Shops from "./userPages/Shops";
import About from "./userPages/About";
import Contact from "./userPages/Contact";
import Categories from "./userPages/Categories";
import NotFound from "./userPages/NotFound";

// User Auth
import Login from "./userPages/Login";
import Signup from "./userPages/Signup";

// Vendor
import ProductListing from "./vendorPages/ProductListing";
import MyProducts from "./vendorPages/MyProducts";
import VendorLogin from "./vendorPages/VendorLogin";
import VendorSignup from "./vendorPages/VendorSignup";
// import VendorDashboard from "./vendorPages/VendorDashboard";

// Context & Auth
import ProtectedRoute from "./components/ProtectedRoute";

// Public page
import LandingPage from "./userPages/LandingPage";

function App() {

  return (
      <Routes>
        {/* PUBLIC */}
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/vendor-login" element={<VendorLogin />} />
        <Route path="/vendor-signup" element={<VendorSignup />} />

        {/* USER ROUTES (PROTECTED) */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["user"]} element={<Layout />} />
          }
        >
          <Route index element={<Home />} />
          <Route path="shops" element={<Shops />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="categories" element={<Categories />} />
        </Route>

        {/* VENDOR ROUTES (PROTECTED) */}
        <Route
          path="/vendor"
          element={
            <ProtectedRoute
              allowedRoles={["vendor"]}
              element={<VendorLayout />}
            />
          }
        >
          <Route path="my-products" element={<MyProducts />} />
          <Route path="add-product" element={<ProductListing />} />
          <Route path="/vendor/about" element={<About />} />
          <Route path="/vendor/contact" element={<Contact />} />
        </Route>

        {/* UNKNOWN PATH */}
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

export default App;
