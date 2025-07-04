import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinkClasses = ({ isActive }) =>
    isActive
      ? "text-[#b88e2f] font-semibold"
      : "text-zinc-600 hover:text-[#b88e2f] transition";

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Dummy logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate("/landing");
  };

  return (
    <header className="bg-slate-200 p-3 shadow-md  mx-2 sm:mx-6  sticky top-0 z-50 mt-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div
          className="font-extrabold text-2xl text-[#b88e2f] hover:text-[#966400] transition duration-500 cursor-pointer hover:scale-110"
          onClick={() => navigate("/")}
        >
          NearBuy
        </div>

        <ul className="hidden md:flex gap-6 text-base font-medium">
          <li><NavLink to="/" className={navLinkClasses}>Home</NavLink></li>
          <li><NavLink to="/shops" className={navLinkClasses}>Shops</NavLink></li>
          <li><NavLink to="/categories" className={navLinkClasses}>Categories</NavLink></li>
          <li><NavLink to="/about" className={navLinkClasses}>About</NavLink></li>
          <li><NavLink to="/contact" className={navLinkClasses}>Contact</NavLink></li>
        </ul>

        <div className="hidden md:flex gap-3">
          <button
            className="border-2 border-[#b88e2f] px-4 py-1.5 rounded-md text-[#b88e2f] hover:text-white hover:cursor-pointer hover:bg-[#b88e2f] transition duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <div className="md:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
          {isOpen ? <FiX /> : <FiMenu />}
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 space-y-3 flex flex-col items-start bg-white p-4 rounded-md shadow-inner max-w-7xl mx-auto">
          <NavLink to="/" className={navLinkClasses}>Home</NavLink>
          <NavLink to="/shops" className={navLinkClasses}>Shops</NavLink>
          <NavLink to="/categories" className={navLinkClasses}>Categories</NavLink>
          <NavLink to="/about" className={navLinkClasses}>About</NavLink>
          <NavLink to="/contact" className={navLinkClasses}>Contact</NavLink>
          <button
            className="w-full border-2 border-[#b88e2f] px-4 py-1.5 rounded-md text-[#b88e2f] hover:text-white hover:bg-[#b88e2f] transition duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;