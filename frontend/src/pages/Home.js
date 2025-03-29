import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Button from "@mui/material/Button";
import "../styles/Home.css";

const Home = () => {
  // Default active tab is set to "home"; adjust if you prefer "wallet"
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Pochi Yangu</h2>
        <nav>
          <ul>
            <li className={activeTab === "home" ? "active" : ""}>
              <Link to="/home" onClick={() => setActiveTab("home")}>
                Home
              </Link>
            </li>
            <li className={activeTab === "wallet" ? "active" : ""}>
              <Link to="/wallet" onClick={() => setActiveTab("wallet")}>
                Wallet
              </Link>
            </li>
            <li className={activeTab === "transfer" ? "active" : ""}>
              <Link to="/transfer" onClick={() => setActiveTab("transfer")}>
                Transfer Money
              </Link>
            </li>
            <li className={activeTab === "explore" ? "active" : ""}>
              <Link to="/explore" onClick={() => setActiveTab("explore")}>
                Explore
              </Link>
            </li>
            <li className={activeTab === "billing" ? "active" : ""}>
              <Link
                to="/billing-dashboard"
                onClick={() => setActiveTab("billing")}
              >
                Billings
              </Link>
            </li>
            <li className={activeTab === "transactions" ? "active" : ""}>
              <Link
                to="/transactions"
                onClick={() => setActiveTab("transactions")}
              >
                Transactions
              </Link>
            </li>
            <li className={activeTab === "profile" ? "active" : ""}>
              <Link to="/profile" onClick={() => setActiveTab("profile")}>
                Profile
              </Link>
            </li>
            <li className={activeTab === "savings" ? "active" : ""}>
              <Link to="/savings" onClick={() => setActiveTab("savings")}>
                Savings
              </Link>
            </li>
            <li className={activeTab === "apply-loan" ? "active" : ""}>
              <Link to="/apply-loan" onClick={() => setActiveTab("apply-loan")}>
                Apply Loan
              </Link>
            </li>
            <li className={activeTab === "repay-loan" ? "active" : ""}>
              <Link to="/repay-loan" onClick={() => setActiveTab("repay-loan")}>
                Repay Loan
              </Link>
            </li>
            <li className={activeTab === "request-payment" ? "active" : ""}>
              <Link
                to="/request-payment"
                onClick={() => setActiveTab("request-payment")}
              >
                Request Payment
              </Link>
            </li>
          </ul>
        </nav>
        <div className="bottom-links">
          <Link to="/settings" onClick={() => setActiveTab("settings")}>
            Adjust Settings
          </Link>
          <Link to="/logout">Logout</Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="top-bar">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search transactions, accounts, loans"
            />
            <FaSearch className="search-icon" />
          </div>
          <div className="profile">Lorem Ipsum</div>
        </header>

        <section className="transfer-details">
          <div className="transfer-card">
            <p>Total balance overview</p>
            <h3>$222,358 available</h3>
            <p>**** **** **** 9222</p>
          </div>
          <div className="transfer-card">
            <p>Total balance overview</p>
            <h3>$392,100 available</h3>
            <p>**** **** **** 9222</p>
          </div>
          <Button variant="contained" className="transfer-btn">
            Initiate transfer
          </Button>
        </section>

        <section className="weekly-financial">
          <div className="tabs">
            <span>Expense overview</span>
            <span>Income overview</span>
          </div>
          <h2 className="balance">-$109,876.33 balance</h2>
          <p className="avg-spending">Avg. monthly spending</p>
          <Button variant="contained" className="upgrade-plan">
            UPGRADE PLAN
          </Button>
          {/* Graph placeholder to be replaced with an actual chart if needed */}
          <div className="graph-placeholder">Graph Here</div>
        </section>
      </main>

      {/* Contacts List */}
      <aside className="contacts-list">
        <h3>Contacts List</h3>
        <ul>
          <li>
            <div className="icon"></div> Contact: Lion Mike
          </li>
          <li>
            <div className="icon"></div> Contact: Sam Smith
          </li>
          <li>
            <div className="icon"></div> Contact: Josh Kendall
          </li>
          <li>
            <div className="icon"></div> Contact: Emma Ive
          </li>
          <li>
            <div className="icon"></div> Contact: Zac Efron
          </li>
        </ul>
        <Button variant="outlined" className="load-more">
          Load more data
        </Button>
        <div className="savings-tip">Tips to save 10% more</div>
      </aside>
    </div>
  );
};

export default Home;
