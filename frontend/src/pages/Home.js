import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Button from "@mui/material/Button";
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
            <li><Link to="/Cross-Border">CrossBorder</Link></li>
          </ul>
        </nav>
        <div className="bottom-links">
          <Link to="#">Adjust Settings</Link>
          <Link to="#">Logout</Link>
        </div>
      </aside>

      {/* Main Content - Middle Column */}
      <div className="main-column" style={{ flex: 1, padding: "20px" }}>
        <header className="top-bar" style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <div className="search-bar" style={{ display: "flex", alignItems: "center" }}>
            <input 
              type="text" 
              placeholder="Search transactions, accounts, loans..." 
              style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
            <FaSearch className="search-icon" style={{ marginLeft: "-25px" }} />
          </div>
          <div className="profile">Lorem Ipsum</div>
        </header>

        {/* Wallet Balance Section */}
        <section className="wallet-balance" style={{ 
          display: "flex", 
          gap: "20px", 
          marginBottom: "30px" 
        }}>
          <div className="balance-card" style={{
            flex: 1,
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            backgroundColor: "#fff"
          }}>
            <p>Total balance overview</p>
            <h3>$222,358 available</h3>
            <p>** ** ** 9222</p>
          </div>
          <div className="balance-card" style={{
            flex: 1,
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            backgroundColor: "#fff"
          }}>
            <p>Total balance overview</p>
            <h3>$392,100 available</h3>
            <p>** ** ** 9222</p>
          </div>
        </section>

        <Button 
          variant="contained" 
          style={{ 
            marginBottom: "30px",
            backgroundColor: "#4CAF50",
            color: "white"
          }}
        >
          Initiate Transfer
        </Button>

        {/* Financial Overview Section */}
        <section className="financial-overview" style={{
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
          marginBottom: "20px"
        }}>
          <div className="tabs" style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
            <span style={{ fontWeight: "bold" }}>Expense Overview</span>
            <span>Income Overview</span>
          </div>
          <h2 className="balance" style={{ margin: "10px 0" }}>-$109,876.33 balance</h2>
          <p className="avg-spending" style={{ color: "#666" }}>Avg. monthly spending</p>
          <Button 
            variant="contained" 
            style={{ 
              marginTop: "15px",
              backgroundColor: "#2196F3",
              color: "white"
            }}
          >
            UPGRADE PLAN
          </Button>
        </section>
      </div>

      {/* Contacts Section - Right Column */}
      <aside className="contacts-column" style={{ 
        width: "300px", 
        padding: "20px",
        backgroundColor: "#f5f5f5",
        overflowY: "auto"
      }}>
        <h3 style={{ marginBottom: "20px" }}>Contacts List</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {["Lion Mike", "Sam Smith", "Josh Kendall", "Emma Ive", "Zac Efron"].map((contact) => (
            <li key={contact} style={{ 
              padding: "10px", 
              marginBottom: "8px", 
              backgroundColor: "#fff",
              borderRadius: "4px"
            }}>
              Contact: {contact}
            </li>
          ))}
        </ul>
        <Button 
          variant="outlined" 
          style={{ 
            width: "100%",
            margin: "20px 0",
            borderColor: "#4CAF50",
            color: "#4CAF50"
          }}
        >
          Load more data
        </Button>
        <div className="savings-tip" style={{
          padding: "15px",
          backgroundColor: "#fff",
          borderRadius: "4px",
          fontStyle: "italic"
        }}>
          Tips to save 10% more
        </div>
      </aside>
    </div>
  );
};

export default Home;