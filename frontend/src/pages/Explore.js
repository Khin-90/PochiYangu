import React from "react";
import { FaSearch, FaStar } from "react-icons/fa";

const ExploreFinancialOptions = () => {
  return (
    <div className="p-6 text-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Explore Financial Options</h1>
      
      {/* Search Bar */}
      <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-4">
        <input 
          type="text" 
          placeholder="Search transactions" 
          className="flex-grow bg-transparent outline-none px-2"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
          <FaSearch className="mr-2" /> Search
        </button>
      </div>
      
      {/* Recent Searches */}
      <div className="mb-4">
        <h2 className="font-semibold mb-2">Recent Searches</h2>
        <div className="flex flex-wrap gap-2">
          {["Loan Management", "Stablecoin Support", "Hedera Hashgraph", "Dark Mode"].map((tag) => (
            <span key={tag} className="bg-gray-200 dark:bg-gray-600 px-3 py-1 rounded-full text-sm">{tag}</span>
          ))}
        </div>
      </div>
      
      {/* Categories */}
      <div className="mb-4">
        <h2 className="font-semibold mb-2">Categories</h2>
        <div className="flex flex-wrap gap-4">
          {["Loan", "Stablecoin", "Cross-border", "Hedera"].map((category) => (
            <label key={category} className="flex items-center">
              <input type="checkbox" className="mr-2" /> {category}
            </label>
          ))}
        </div>
      </div>
      
      {/* Security & User Experience */}
      <div className="grid grid-cols-2 gap-6 mb-4">
        <div>
          <h2 className="font-semibold mb-2">Security</h2>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-500 mr-1" />
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-semibold mb-2">User Experience</h2>
          <div className="flex gap-4">
            {["Beginner", "Intermediate", "Professional"].map((level) => (
              <label key={level} className="flex items-center">
                <input type="checkbox" className="mr-2" /> {level}
              </label>
            ))}
          </div>
        </div>
      </div>
      
      {/* Recommended Section */}
      <div>
        <h2 className="font-semibold mb-2">Recommended for You</h2>
        <div className="grid grid-cols-4 gap-4">
          {["Loan Insights", "Stablecoin Basics", "Cross-border Finance", "Secure Transactions"].map((item) => (
            <div key={item} className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-center">
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreFinancialOptions;
