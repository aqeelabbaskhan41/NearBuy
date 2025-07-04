import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/user/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: Email, password: Password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      console.log(data.role)
      localStorage.setItem('token', data.jwtToken);
      localStorage.setItem('role', data.role);
      console.log("Login successful:", data);
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setEmail("");
      setPassword("");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error(error.message || "An error occurred during login", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9df2ff] via-[#e2ddd5] to-[#a66d12] flex items-center justify-center p-4 transition-all duration-300 relative">
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#b88e2f] mb-2 transition-colors duration-300">
            Welcome Back
          </h1>
          <p className="text-gray-600 md:text-lg transition-colors duration-300">
            Sign in to access your account
          </p>
        </div>

        <form
          onSubmit={submitHandler}
          className="bg-white p-6 md:p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
        >
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
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                required
                placeholder="your@email.com"
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
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                id="password"
                required
                placeholder="••••••••"
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
            <div className="flex justify-end mt-2">
              <Link
                to="/forgot-password"
                className="text-sm text-[#b88e2f] hover:text-[#9a7827] underline-offset-2 hover:underline transition-all duration-300"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-[#b88e2f] to-[#d4a73f] hover:from-[#9a7827] hover:to-[#b88e2f] duration-300 transform hover:scale-[1.02] hover:cursor-pointer"
          >
            Login
          </button>

          <div className="mt-6 text-center">
            <p className="text-gray-600 transition-colors duration-300">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-[#b88e2f] hover:text-[#9a7827] underline-offset-2 hover:underline transition-all duration-300"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;