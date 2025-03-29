import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const [activeTab, setActiveTab] = useState("wallet");

  return (
    <div className="home-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">Pochi Yangu</h2>
        <nav>
          <ul>
            <li>
              <Link
                to="/wallet"
                className={activeTab === "wallet" ? "active" : ""}
                onClick={() => setActiveTab("wallet")}
              >
                Wallet
              </Link>
            </li>
            <li>
              <Link
                to="/transfer"
                className={activeTab === "transfer" ? "active" : ""}
                onClick={() => setActiveTab("transfer")}
              >
                Transfer Money
              </Link>
            </li>
            <li>
              <Link
                to="/explore"
                className={activeTab === "explore" ? "active" : ""}
                onClick={() => setActiveTab("explore")}
              >
                Explore
              </Link>
            </li>
            <li>
              <Link
                to="/billing-dashboard"
                className={activeTab === "billing" ? "active" : ""}
                onClick={() => setActiveTab("billing")}
              >
                Billings
              </Link>
            </li>
            <li>
              <Link
                to="/transactions"
                className={activeTab === "transactions" ? "active" : ""}
                onClick={() => setActiveTab("transactions")}
              >
                Transactions
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className={activeTab === "profile" ? "active" : ""}
                onClick={() => setActiveTab("profile")}
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/savings"
                className={activeTab === "savings" ? "active" : ""}
                onClick={() => setActiveTab("savings")}
              >
                Savings
              </Link>
            </li>
            <li>
              <Link
                to="/apply-loan"
                className={activeTab === "apply-loan" ? "active" : ""}
                onClick={() => setActiveTab("apply-loan")}
              >
                Apply for Loan
              </Link>
            </li>
            <li>
              <Link
                to="/repay-loan"
                className={activeTab === "repay-loan" ? "active" : ""}
                onClick={() => setActiveTab("repay-loan")}
              >
                Repay Loan
              </Link>
            </li>
            <li>
              <Link
                to="/request-payment"
                className={activeTab === "request-payment" ? "active" : ""}
                onClick={() => setActiveTab("request-payment")}
              >
                Request Payment
              </Link>
            </li>
          </ul>
        </nav>
        <div className="bottom-links">
          <Link to="#">Adjust Settings</Link>
          <Link to="#">Logout</Link>
        </div>
      </aside>

      {/* Wallets Section */}
      <main className="wallets-container">
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

        {/* Weekly Financial Graph (Placeholder) */}
        <div className="financial-section">
          <h3>Weekly Financial</h3>
          <p className="negative-balance">-$109,876.33 balance</p>
          <div className="graph-placeholder">Graph Here</div>
        </div>
      </main>

      {/* Contact List */}
      <aside className="contacts-container">
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
