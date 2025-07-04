import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaShieldAlt,
  FaHome,
  FaStore,
  FaInfoCircle,
  FaPhone,
  FaHeadphones, // Use FaHeadphones instead of FaHeadset
} from "react-icons/fa";

function Footer() {
  const navLinkClasses = ({ isActive }) =>
    isActive
      ? "text-[#b88e2f] font-semibold flex items-center text-sm sm:text-base"
      : "text-gray-600 hover:text-[#b88e2f] transition-colors flex items-center text-sm sm:text-base";

  return (
    <footer className="bg-gray-50 text-gray-700 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="xs:col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-2xl text-[#b88e2f]">NearBuy</span>
              <span className="text-xs bg-[#b88e2f] text-white px-2 py-1 rounded-full">
                LOCAL MARKETPLACE
              </span>
            </div>
            <p className="text-gray-600 text-sm sm:text-base">
              Connecting you with the best local shops and products in your community.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://facebook.com/nearbuy"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
              >
                <FaFacebookF className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com/nearbuy"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-full transition-colors"
              >
                <FaTwitter className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com/nearbuy"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pink-600 hover:bg-pink-700 text-white p-2 rounded-full transition-colors"
              >
                <FaInstagram className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com/company/nearbuy"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-700 hover:bg-blue-800 text-white p-2 rounded-full transition-colors"
              >
                <FaLinkedinIn className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-4 sm:mt-0">
            <h6 className="text-base sm:text-lg font-bold text-gray-900 uppercase tracking-wide mb-3 flex items-center">
              <FaHome className="mr-2 text-[#b88e2f] text-sm" /> Links
            </h6>
            <ul className="space-y-2.5">
              <li>
                <NavLink to="/" className={navLinkClasses} end>
                  <FaHome className="mr-2 text-xs" /> Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/shops" className={navLinkClasses}>
                  <FaStore className="mr-2 text-xs" /> Shops
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={navLinkClasses}>
                  <FaInfoCircle className="mr-2 text-xs" /> About
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={navLinkClasses}>
                  <FaPhone className="mr-2 text-xs" /> Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="mt-4 sm:mt-0">
            <h6 className="text-base sm:text-lg font-bold text-gray-900 uppercase tracking-wide mb-3 flex items-center">
              <FaHeadphones className="mr-2 text-[#b88e2f] text-sm" /> Support
            </h6>
            <ul className="space-y-2.5">
              <li className="flex items-start space-x-2">
                <FaShieldAlt className="h-4 w-4 text-[#b88e2f] mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 text-sm sm:text-base">Secure Payments</span>
              </li>
              <li className="flex items-start space-x-2">
                <FaPhoneAlt className="h-4 w-4 text-[#b88e2f] mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 text-sm sm:text-base">+92-301545336</span>
              </li>
              <li className="flex items-start space-x-2">
                <FaEnvelope className="h-4 w-4 text-[#b88e2f] mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 text-sm sm:text-base">support@nearbuy.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <FaClock className="h-4 w-4 text-[#b88e2f] mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 text-sm sm:text-base">Mon-Fri: 9AM-6PM</span>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div className="mt-4 sm:mt-0 xs:col-span-2 md:col-span-1">
            <h6 className="text-base sm:text-lg font-bold text-gray-900 uppercase tracking-wide mb-3 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-[#b88e2f] text-sm" /> Location
            </h6>
            <div className="space-y-2.5">
              <p className="text-gray-600 text-sm sm:text-base">
                NearBuy Marketplace<br />
                Mianwali, Punjab<br />
                Pakistan
              </p>
              <div className="pt-2">
                <NavLink
                  to="/contact"
                  className="inline-flex items-center text-[#b88e2f] hover:text-[#9a7827] transition-colors text-sm sm:text-base"
                >
                  <FaPhone className="mr-2" /> Contact Us
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="bg-gray-100 border-t border-gray-200 mt-6 sm:mt-8 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
              <p className="text-gray-600 text-xs sm:text-sm text-center sm:text-left">
                © 2025 NearBuy. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                <a href="#" className="text-gray-600 hover:text-[#b88e2f] text-xs sm:text-sm">Privacy Policy</a>
                <a href="#" className="text-gray-600 hover:text-[#b88e2f] text-xs sm:text-sm">Terms of Service</a>
                <a href="#" className="text-gray-600 hover:text-[#b88e2f] text-xs sm:text-sm">Shipping Policy</a>
                <a href="#" className="text-gray-600 hover:text-[#b88e2f] text-xs sm:text-sm">Returns</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;