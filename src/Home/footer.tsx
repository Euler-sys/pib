import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import logo from "../assets/logo.webp";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white">
      
      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        
        {/* BRAND */}
        <div>
          <img src={logo} alt="Bank Logo" className="w-40 mb-4" />
          <h2 className="text-xl font-semibold mb-2">
            Premium Investment Bank
          </h2>
          <p className="text-sm text-gray-400">
            Trusted financial solutions built for the future.
          </p>
        </div>

        {/* CONTACT INFO */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="text-sm text-gray-400 mb-2">
            General Supervisor: <span className="text-white">Ryan Hawkins</span>
          </p>
          <p className="text-sm text-gray-400 mb-2">
            Phone:{" "}
            <span className="text-white">+60168181153</span>
          </p>
          <p className="text-sm text-gray-400">
            25, Naza Tower, Platinum Park, 10, Persiaran KLCC,
            Kuala Lumpur, 50088, Malaysia
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <div className="flex flex-col space-y-2 text-sm text-gray-400">
            <a href="#" className="hover:text-white">About Us</a>
            <a href="#" className="hover:text-white">Contact</a>
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms & Conditions</a>
          </div>
        </div>
      </div>

      {/* SOCIAL */}
      <div className="border-t border-gray-800 py-6">
        <div className="flex justify-center gap-5 text-lg">
          <FaFacebookF className="cursor-pointer hover:text-gray-400" />
          <FaInstagram className="cursor-pointer hover:text-gray-400" />
          <FaLinkedinIn className="cursor-pointer hover:text-gray-400" />
          <FaXTwitter className="cursor-pointer hover:text-gray-400" />
        </div>
      </div>

      {/* BOTTOM */}
      <div className="text-center text-sm text-gray-500 pb-6 px-4">
        <p>
          © {new Date().getFullYear()} Premium Investment Bank. All rights reserved.
        </p>
        <p className="mt-1">
          Built with trust, security, and financial excellence.
        </p>
      </div>
    </footer>
  );
};

export default Footer;