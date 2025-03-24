import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [text, setText] = useState("");
  const message = "Welcome to Pochi Yangu";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(message.substring(0, i));
      i++;
      if (i > message.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white text-center p-6">
      {/* Typewriter Effect */}
      <h1 className="text-4xl font-bold mb-4">{text}</h1>

      {/* Subtitle */}
      <p className="text-lg mb-6 max-w-lg">
        The future of secure and fast financial transactions. Send, save, and manage money with ease.
      </p>

      {/* Call-to-Action Buttons */}
      <div className="flex space-x-4">
        <Link to="/apply-loan" className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100">
          Apply for a Loan
        </Link>
        <Link to="/wallet" className="bg-white text-purple-600 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100">
          View Wallet
        </Link>
      </div>
    </div>
  );
};

export default Home;
