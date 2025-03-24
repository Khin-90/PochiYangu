import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white p-6 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo & Copyright */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold">Pochi Yangu</h2>
          <p className="text-sm mt-1">Secure & Fast Digital Transactions</p>
          <p className="text-sm mt-2">&copy; {currentYear} Pochi Yangu. All rights reserved.</p>
        </div>

        {/* Quick Links */}
        <div className="mt-4 md:mt-0">
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
            <li><Link to="/wallet" className="hover:text-blue-400">Wallet</Link></li>
            <li><Link to="/transactions" className="hover:text-blue-400">Transactions</Link></li>
            <li><Link to="/profile" className="hover:text-blue-400">Profile</Link></li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="mt-4 md:mt-0">
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-blue-400">🔵 Facebook</a></li>
            <li><a href="#" className="hover:text-blue-400">🐦 Twitter</a></li>
            <li><a href="#" className="hover:text-blue-400">📸 Instagram</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
