// src/userPages/Contact.jsx
import React from "react";

function Contact() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col md:flex-row items-center justify-center px-4 py-12 ">
      
      {/* Image Section */}
      <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
        <img
          src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Contact Illustration"
          className="w-full rounded-xl shadow-lg object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Form Section */}
      <div className="md:w-1/2 w-full max-w-lg bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-[#b88e2f]">Contact Us</h2>
        <p className="mb-6 text-gray-700">
          We'd love to hear from you! Fill out the form and we’ll get back to you shortly.
        </p>

        <form className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-[#b88e2f]"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-[#b88e2f]"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Message</label>
            <textarea
              className="w-full border border-gray-300 rounded-md px-4 py-2 h-32 resize-none focus:outline-none focus:border-[#b88e2f]"
              placeholder="Your message..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-[#b88e2f] hover:bg-[#a07a26] hover:cursor-pointer text-white font-semibold px-6 py-2 rounded-md transition duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
