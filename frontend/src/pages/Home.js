import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome to Pochi Yangu</h1>
      <p className="mt-2">Your trusted financial partner in Kenya.</p>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-blue-600">Loans</h3>
            <p className="mt-2">Quick and affordable loans tailored to your needs.</p>
            <Link to="/apply-loan" className="text-blue-500 hover:underline mt-2 inline-block">
              Apply Now
            </Link>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-green-600">Savings</h3>
            <p className="mt-2">Earn up to 16% yearly returns on your savings.</p>
            <Link to="/savings" className="text-blue-500 hover:underline mt-2 inline-block">
              Start Saving
            </Link>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-purple-600">Transfers</h3>
            <p className="mt-2">Send money to friends and family with ease.</p>
            <Link to="/transfer" className="text-blue-500 hover:underline mt-2 inline-block">
              Transfer Now
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-blue-50 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Why Choose Pochi Yangu?</h2>
        <ul className="mt-4 list-disc list-inside">
          <li>Fast and secure transactions</li>
          <li>Competitive interest rates</li>
          <li>No hidden fees</li>
          <li>24/7 customer support</li>
          <li>Blockchain-based security</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;