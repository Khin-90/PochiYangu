import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">Pochi Yangu</h2>
        <nav>
          <ul>
            <li><Link to="/wallet">Wallet</Link></li>
            <li><Link to="/transfer">Transfer Money</Link></li>
            <li><Link to="/explore">Explore</Link></li>
            <li><Link to="/billing-dashboard">Billings</Link></li>
            <li><Link to="/transactions">Transactions</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/savings">Savings</Link></li>
            <li><Link to="/apply-loan">Apply for Loan</Link></li>
            <li><Link to="/repay-loan">Repay Loan</Link></li>
            <li><Link to="/request-payment">Request Payment</Link></li>
          </ul>
        </nav>
        <div className="bottom-links">
          <Link to="#">Adjust Settings</Link>
          <Link to="#">Logout</Link>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="content">
        {/* Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="Search transactions, accounts, loans..." />
        </div>

        {/* Wallet Balance Cards */}
        <div className="wallet-cards">
          <div className="card">
            <p>Total balance overview</p>
            <h3>$222,358 available</h3>
          </div>
          <div className="card">
            <p>Total balance overview</p>
            <h3>$392,100 available</h3>
          </div>
        </div>

        {/* Weekly Financial Graph (Hardcoded) */}
        <div className="financial-section">
          <h3>Weekly Financial</h3>
          <p className="negative-balance">-$109,876.33 balance</p>
          <div className="graph-placeholder">Graph Here</div>
        </div>
      </main>
      
      {/* Contact List */}
      <aside className="contact-list">
        <h3>Contacts List</h3>
        <div className="contacts">
          <div className="contact"><div className="icon" /> Contact: Lion Mike</div>
          <div className="contact"><div className="icon" /> Contact: Sam Smith</div>
          <div className="contact"><div className="icon" /> Contact: Josh Kendall</div>
          <div className="contact"><div className="icon" /> Contact: Emma Ive</div>
          <div className="contact"><div className="icon" /> Contact: Zac Efron</div>
        </div>
      </aside>
    </div>
  );
};

export default Home;