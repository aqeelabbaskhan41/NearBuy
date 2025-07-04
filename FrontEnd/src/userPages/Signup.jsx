import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  async function handleSignup(e) {
    e.preventDefault();

    try {
      const url = "http://localhost:8080/user/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: name,
          email: email,
          password: password,
          phone_number: phoneNumber,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }
      toast.success(data.message, {
        position: "top-right",
        autoClose: 2000, // Toast displays for 3 seconds
      });

      // Reset form
      setName("");
      setEmail("");
      setPhoneNumber("");
      setPassword("");
      setConfirmPassword("");

      // Delay navigation to allow toast to display
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Match the autoClose duration
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  }

  const isPasswordMismatch = confirmPassword && password !== confirmPassword;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9df2ff] via-[#e2ddd5] to-[#a66d12] flex items-center justify-center p-4 transition-all duration-300 relative">
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#b88e2f] mb-2 transition-colors duration-300">
            Create Account
          </h1>
          <p className="text-gray-600 md:text-lg transition-colors duration-300">
            Join our community today
          </p>
        </div>

        <form
          onSubmit={handleSignup}
          className="bg-white p-6 md:p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2 transition-colors duration-300"
            >
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="text-gray-400 transition-colors duration-300" />
              </div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                required
                placeholder="ABC XYZ"
                aria-label="Full Name"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-[#b88e2f] outline-none transition-all duration-300 hover:border-amber-100"
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2 transition-colors duration-300"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400 transition-colors duration-300" />
              </div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                required
                placeholder="your@email.com"
                aria-label="Email Address"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-[#b88e2f] outline-none transition-all duration-300 hover:border-amber-100"
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 font-medium mb-2 transition-colors duration-300"
            >
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IoPhonePortraitOutline className="text-gray-400 transition-colors duration-300" />
              </div>
              <input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="tel"
                id="phoneNumber"
                required
                placeholder="123-456-7890"
                aria-label="Phone Number"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-[#b88e2f] outline-none transition-all duration-300 hover:border-amber-100"
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2 transition-colors duration-300"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400 transition-colors duration-300" />
              </div>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                id="password"
                required
                minLength="6"
                placeholder="••••••••"
                aria-label="Password"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:border-[#b88e2f] outline-none transition-all duration-300 hover:border-amber-100"
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <FiEyeOff className="text-gray-400 hover:text-[#b88e2f] transition-colors duration-300" />
                ) : (
                  <FiEye className="text-gray-400 hover:text-[#b88e2f] transition-colors duration-300" />
                )}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium mb-2 transition-colors duration-300"
            >
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400 transition-colors duration-300" />
              </div>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                required
                minLength="6"
                placeholder="••••••••"
                aria-label="Confirm Password"
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:border-[#b88e2f] outline-none transition-all duration-300 hover:border-amber-100 ${
                  isPasswordMismatch ? "border-red-500" : "border-gray-300"
                }`}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? (
                  <FiEyeOff className="text-gray-400 hover:text-[#b88e2f] transition-colors duration-300" />
                ) : (
                  <FiEye className="text-gray-400 hover:text-[#b88e2f] transition-colors duration-300" />
                )}
              </div>
            </div>
            {isPasswordMismatch && (
              <p className="text-red-500 text-sm mt-1">
                Passwords do not match
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-[#b88e2f] to-[#d4a73f] hover:from-[#9a7827] hover:to-[#b88e2f] transition-all duration-300 transform hover:scale-[1.02] hover:cursor-pointer"
          >
            Sign Up
          </button>

          <div className="mt-6 text-center">
            <p className="text-gray-600 transition-colors duration-300">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-[#b88e2f] hover:text-[#9a7827] underline-offset-2 hover:underline transition-all duration-300"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Signup;