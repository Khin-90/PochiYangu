import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-6">
      {/* Main Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Pochi Yangu</h1>
        <div className="flex items-center space-x-4">
          <span className="bg-white/20 px-4 py-2 rounded-full">Premium Member</span>
          <div className="w-10 h-10 bg-white rounded-full"></div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button className="dashboard-card bg-white/20 hover:bg-white/30">
          Scaler money
        </button>
        <button className="dashboard-card bg-white/20 hover:bg-white/30">
          View transactions
        </button>
        <button className="dashboard-card bg-white/20 hover:bg-white/30">
          Manage accounts
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Balances Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="dashboard-card">
              <h2 className="section-title">Transfer Details</h2>
              <p className="text-2xl font-bold">$222,358 available</p>
            </div>
            <div className="dashboard-card">
              <h2 className="section-title">View history</h2>
              <p className="text-2xl font-bold">$392,100 available</p>
            </div>
          </div>

          {/* Contracts Section */}
          <div className="dashboard-card">
            <h2 className="section-title">Contracts List</h2>
            <div className="space-y-3">
              {["All", "Recent", "Loan Mike", "Sam Smith", "Josh Kendall", "Emma Ike", "Zac Finn"].map((item) => (
                <div key={item} className="contract-item">
                  {item.startsWith("Loan") ? `Contract: ${item}` : item}
                </div>
              ))}
              <button className="text-purple-300 hover:text-white mt-4">
                Load more data →
              </button>
            </div>
          </div>

          {/* Financial Overview */}
          <div className="dashboard-card">
            <h2 className="section-title">Weekly Financial</h2>
            <p className="text-red-500 text-xl font-bold">-$109,876.33 balance</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Security Accounts */}
          <div className="dashboard-card">
            <h2 className="section-title">Key Security Accounts</h2>
            <div className="space-y-4">
              {["10.3k", "7.9k", "5.9k", "3.6k", "0.9k"].map((value) => (
                <div key={value} className="security-account">
                  ${value}
                </div>
              ))}
            </div>
          </div>

          {/* Savings Tip */}
          <div className="dashboard-card bg-purple-400/20">
            <h2 className="section-title">Tips to save 10% more</h2>
            <p className="text-purple-200">Access Included</p>
          </div>

          {/* Settings */}
          <div className="dashboard-card">
            <h2 className="section-title">Adjust settings</h2>
            <div className="mt-4 space-y-2">
              <button className="text-red-400 hover:text-red-300">
                Logout
              </button>
              <p className="text-sm text-gray-300">
                23 May 2021 - 23 May 2022 data
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="dashboard-card mt-6">
        <h2 className="section-title">Review overview</h2>
        <div className="flex items-center justify-between">
          <span>TCP IDE 2.0.5</span>
          <select className="bg-transparent border rounded px-3 py-1">
            <option>Select Time</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Home;