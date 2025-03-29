import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaCog, FaSignOutAlt, FaUser, FaFileInvoice } from "react-icons/fa";
import "../styles/BillingDashboard.css"; // Import custom styles

const BillingDashboard = () => {
  const [isOverlayVisible, setOverlayVisible] = useState(true);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">Pochi Yangu</h2>
        <ul className="menu">
          <li><FaUser /> Overview of finances</li>
          <li><FaFileInvoice /> Send money</li>
          <li>View transactions</li>
          <li>Manage accounts</li>
        </ul>
        <div className="bottom-menu">
          <button className="settings"><FaCog /> Adjust settings</button>
          <button className="logout"><FaSignOutAlt /> Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="content">
        <header className="topbar">
          <h1>Billing Management</h1>
          <div className="actions">
            <FaSearch className="icon" />
            <button className="create-invoice">Create Invoice</button>
          </div>
        </header>

        {/* Invoice List */}
        <section className="invoices">
          {["#48-9038", "#48-9039", "#48-9040", "#48-9041"].map((invoice, index) => (
            <motion.div
              key={index}
              className={`invoice-item ${index === 2 ? "active" : ""}`}
              whileHover={{ scale: 1.05 }}
            >
              Invoice {invoice} Details
            </motion.div>
          ))}
        </section>

        {/* Invoice Summary */}
        <section className="invoice-summary">
          <h2>Invoice Summary 2023-37-91</h2>
          <div className="summary-details">
            <p><strong>Sender Information:</strong> Pochi Yangu Address, 808 Main Road</p>
            <p><strong>Recipient:</strong> ABC Corp, 11 Main Street</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Transaction Type</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Service Details</td><td>Service Charges</td><td>1</td><td>$2,500</td></tr>
              <tr><td>Deposit</td><td>Deposit Charges</td><td>1</td><td>$2,500</td></tr>
              <tr><td>Food</td><td>Food Loan</td><td>1</td><td>$5,000</td></tr>
            </tbody>
          </table>
          <p className="total">Total Amount: <strong>$9,800</strong></p>
        </section>
      </main>

    </div>
  );
};

export default BillingDashboard;
