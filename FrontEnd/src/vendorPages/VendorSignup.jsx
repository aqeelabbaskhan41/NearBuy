import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiUser,
  FiPhone,
  FiMapPin,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icon in Leaflet
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function LocationMarker({ setPosition, setAddress }) {
  useMapEvents({
    click(e) {
      const newPosition = [e.latlng.lat, e.latlng.lng];
      console.log("Map clicked at:", newPosition); // Debug: Log clicked coordinates
      setPosition(newPosition);
      // Fetch address using reverse geocoding
      fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${e.latlng.lat}&lon=${e.latlng.lng}&format=json`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("Geocoding response:", data); // Debug: Log geocoding response
          const newAddress =
            data.display_name || `${newPosition[0]}, ${newPosition[1]}`;
          setAddress(newAddress);
          toast.info(`Location selected: ${newAddress}`, {
            position: "top-right",
            autoClose: 3000,
          });
        })
        .catch((err) => {
          console.error("Geocoding error:", err); // Debug: Log geocoding error
          const fallbackAddress = `${newPosition[0]}, ${newPosition[1]}`;
          setAddress(fallbackAddress);
          toast.info(`Location selected: ${fallbackAddress}`, {
            position: "top-right",
            autoClose: 3000,
          });
        });
    },
  });
  return null;
}

function VendorSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [position, setPosition] = useState([32.5777, 71.5281]); // Default: Mianwali, Punjab, Pakistan
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Prepare data for the backend
    const formData = {
      business_name: name,
      email,
      password,
      phone_number: phone,
      buisness_catagory: category,
      business_description: description,
      business_address: address,
      location: position, // [latitude, longitude]
    };

    console.log("Submitting form data:", formData); // Debug: Log form data

    try {
      const response = await fetch("http://localhost:8080/vendor/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // Reset form on successful signup
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");
      setCategory("");
      setDescription("");
      setAddress("");
      setPosition([32.5777, 71.5281]);
      toast.success(
        data.message || "Signup successful! Redirecting to login...",
        {
          position: "top-right",
          autoClose: 2000,
        }
      );
      setTimeout(() => navigate("/vendor-login"), 2000); // Redirect after toast
    } catch (error) {
      toast.error(error.message || "An error occurred during signup.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9df2ff] via-[#e2ddd5] to-[#a66d12] flex items-center justify-center p-4">
      <ToastContainer />
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#b88e2f] mb-2">
            Register Your Business
          </h1>
          <p className="text-gray-600">Join our community today</p>
        </div>

        <form
          onSubmit={handleSignup}
          className="bg-white p-8 rounded-xl shadow-lg"
        >
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Business Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="text-gray-400" />
              </div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                required
                placeholder="ABC XYZ"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-[#b88e2f] outline-none transition"
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400" />
              </div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                required
                placeholder="your@email.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-[#b88e2f] outline-none transition"
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-medium mb-2"
            >
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiPhone className="text-gray-400" />
              </div>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                id="phone"
                required
                placeholder="+923001234567"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-[#b88e2f] outline-none transition"
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400" />
              </div>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                id="password"
                required
                minLength="6"
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:border-[#b88e2f] outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <FiEyeOff className="text-gray-400" />
                ) : (
                  <FiEye className="text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400" />
              </div>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                required
                minLength="6"
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:border-[#b88e2f] outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? (
                  <FiEyeOff className="text-gray-400" />
                ) : (
                  <FiEye className="text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="category"
              className="block text-gray-700 font-medium mb-2"
            >
              Business Category
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                id="category"
                required
                className="w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:border-[#b88e2f] outline-none transition appearance-none"
              >
                <option value="">Select a category</option>
                <option value="retail">Retail</option>
                <option value="food">Food & Beverage</option>
                <option value="service">Professional Services</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="other">Other</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Business Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              placeholder="Briefly describe your business"
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:border-[#b88e2f] outline-none transition"
              rows="4"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="address"
              className="block text-gray-700 font-medium mb-2"
            >
              Business Address
            </label>
            <div className="mb-3 h-40 rounded-lg overflow-hidden">
              <MapContainer
                center={position}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {position && <Marker position={position} />}
                <LocationMarker
                  setPosition={setPosition}
                  setAddress={setAddress}
                />
              </MapContainer>
              <p className="text-xs mt-2 text-center">
                Click on the map to select your location and auto-fill the
                address
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMapPin className="text-gray-400" />
              </div>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                id="address"
                required
                placeholder="Enter address or click map to auto-fill (e.g., 123 Business St, Mianwali, Pakistan)"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-[#b88e2f] outline-none transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center py-3 px-4 rounded-lg font-medium text-white bg-[#b88e2f] hover:bg-[#9a7827]"
          >
            Signup
          </button>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/vendor-login"
                className="font-medium text-[#b88e2f] hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VendorSignup;
