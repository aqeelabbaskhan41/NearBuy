import React from "react";
import { Outlet } from "react-router-dom";
import VendorHeader from "./components/vendorHeader";
import VendorFooter from "./components/VendorFooter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function VendorLayout() {
  return (
    <div>
      <VendorHeader />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
      <VendorFooter />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }} // This is the key change
      />
    </div>
  );
}
export default VendorLayout;
