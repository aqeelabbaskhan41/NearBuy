import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 flex flex-col items-center">
      {/* Heading */}
      <div className="text-center max-w-2xl mb-10">
        <h1 className="text-4xl font-bold text-[#b88e2f] mb-4">About Us</h1>
        <p className="text-gray-700 text-lg">
          Discover how we're helping you find the best local shops and products with ease.
        </p>
      </div>

      {/* Image and Info */}
      <div className="flex flex-col md:flex-row items-center max-w-6xl w-full gap-10 mb-16 ">
        <img
          src="https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Team at work"
          className="rounded-lg shadow-lg w-full md:w-1/2 object-cover h-[300px] hover:scale-105 transition-transform duration-500"
        />

        <div className="text-gray-800 space-y-4 md:w-1/2">
          <h2 className="text-2xl font-semibold text-[#b88e2f]">Who We Are</h2>
          <p>
            We are a passionate team of developers, designers, and product experts
            committed to connecting users with the best local shops and trending products.
          </p>
          <p>
            Our goal is to make shopping more convenient and community-driven, combining
            the power of technology with real-world businesses.
          </p>
        </div>
      </div>

      {/* Mission and Vision */}
      <div className="w-full max-w-4xl mb-16 grid md:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-xl shadow hover:scale-105 hover:cursor-pointer transition-transform duration-500">
          <h3 className="text-xl font-bold text-[#b88e2f] mb-2">Our Mission</h3>
          <p className="text-gray-700">
            To create a seamless shopping experience by bridging the gap between local
            businesses and tech-savvy customers.
          </p>
        </div>
        <div className="bg-gray-50 p-6 rounded-xl shadow hover:scale-105 hover:cursor-pointer transition-transform duration-500">
          <h3 className="text-xl font-bold text-[#b88e2f] mb-2">Our Vision</h3>
          <p className="text-gray-700">
            Empower every user to shop smarter, support local businesses, and explore
            quality products with confidence.
          </p>
        </div>
      </div>

      {/* Our Values */}
      <div className="w-full max-w-4xl mb-16">
        <h3 className="text-2xl font-semibold text-[#b88e2f] mb-4 text-center">Our Core Values</h3>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-gray-700">
          <li className="bg-gray-100 p-4 rounded-xl shadow hover:scale-105 hover:cursor-pointer transition-transform duration-500">Transparency</li>
          <li className="bg-gray-100 p-4 rounded-xl shadow hover:scale-105 hover:cursor-pointer transition-transform duration-500">Trust</li>
          <li className="bg-gray-100 p-4 rounded-xl shadow hover:scale-105 hover:cursor-pointer transition-transform duration-500">User First</li>
          <li className="bg-gray-100 p-4 rounded-xl shadow hover:scale-105 hover:cursor-pointer transition-transform duration-500">Innovation</li>
          <li className="bg-gray-100 p-4 rounded-xl shadow hover:scale-105 hover:cursor-pointer transition-transform duration-500">Community</li>
          <li className="bg-gray-100 p-4 rounded-xl shadow hover:scale-105 hover:cursor-pointer transition-transform duration-500">Support</li>
        </ul>
      </div>

      {/* Stats (Optional) */}
      <div className="w-full max-w-4xl text-center">
        <h3 className="text-2xl font-semibold text-[#b88e2f] mb-4">Our Impact</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-gray-50 p-4 rounded-xl shadow hover:scale-105 hover:cursor-pointer transition-transform duration-500">
            <p className="text-3xl font-bold text-[#b88e2f]">10K+</p>
            <p className="text-gray-600">Shops Listed</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl shadow hover:scale-105 hover:cursor-pointer transition-transform duration-500">
            <p className="text-3xl font-bold text-[#b88e2f]">50K+</p>
            <p className="text-gray-600">Happy Users</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl shadow hover:scale-105 hover:cursor-pointer transition-transform duration-500">
            <p className="text-3xl font-bold text-[#b88e2f]">100+</p>
            <p className="text-gray-600">Cities Covered</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl shadow hover:scale-105 hover:cursor-pointer transition-transform duration-500">
            <p className="text-3xl font-bold text-[#b88e2f]">24/7</p>
            <p className="text-gray-600">Customer Support</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;