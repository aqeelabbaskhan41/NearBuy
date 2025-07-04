import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9df2ff] via-[#e2ddd5] to-[#a66d12] flex flex-col">
      {/* Navbar */}
      <nav className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 max-w-7xl mx-auto w-full">
        <div
          className="text-2xl sm:text-3xl font-extrabold text-[#b88e2f] cursor-pointer hover:text-[#966400] transition duration-300 mb-4 sm:mb-0"
          onClick={() => window.scrollTo(0, 0)}
        >
          NearBuy
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto justify-center sm:justify-end">
          <button
            className="cursor-pointer px-3 py-2 sm:px-5 sm:py-2 border border-[#b88e2f] text-[#b88e2f] rounded-md hover:bg-[#b88e2f] hover:text-white transition text-sm sm:text-base"
            onClick={() => navigate("/login")}
          >
            Login as Buyer
          </button>
          <button
            className="cursor-pointer px-3 py-2 sm:px-5 sm:py-2 border border-[#b88e2f] text-[#b88e2f] rounded-md hover:bg-[#b88e2f] hover:text-white transition text-sm sm:text-base"
            onClick={() => navigate("/vendor-login")}
          >
            Login as Vendor
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto flex-grow px-4 sm:px-6 md:px-12 py-8 sm:py-10 md:py-20">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#b88e2f] leading-tight mb-4 sm:mb-6">
            Find Nearest <span className="text-[#7a5c1e]">Shops</span> and{" "}
            <span className="text-[#7a5c1e]">Products</span> with Ease
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 max-w-md mx-auto md:mx-0">
            Connect with local vendors and buy your favorite products nearby.
            Trusted, quick, and convenient shopping experience.
          </p>

          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 sm:gap-4">
            <button
              className="cursor-pointer px-3 py-2 sm:px-5 sm:py-2 border border-[#b88e2f] text-[#b88e2f] rounded-md hover:bg-[#b88e2f] hover:text-white transition text-sm sm:text-base"
              onClick={() => navigate("/signup")}
            >
              Sign Up as Buyer
            </button>
            <button
              className="cursor-pointer px-3 py-2 sm:px-5 sm:py-2 border border-[#b88e2f] text-[#b88e2f] rounded-md hover:bg-[#b88e2f] hover:text-white transition text-sm sm:text-base"
              onClick={() => navigate("/vendor-signup")}
            >
              Sign Up as Vendor
            </button>
          </div>
        </div>

        {/* Illustration */}
        <div className="md:w-1/2 flex justify-center mb-8 sm:mb-10 md:mb-0 px-4 sm:px-0">
          <img
            src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=450&w=700"
            alt="Shopping illustration"
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#b88e2f] text-white py-4 sm:py-6 text-center text-xs sm:text-sm">
        &copy; {new Date().getFullYear()} NearBuy. All rights reserved.
      </footer>
    </div>
  );
}

export default LandingPage;