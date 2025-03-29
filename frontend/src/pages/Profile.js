import React, { useState } from "react";
import { FaUserCircle, FaCopy, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

const Profile = () => {
  // Hardcoded User Data (Non-Editable)
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    walletId: "0.0.123456",
    status: "frequent",
  };

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Copy Wallet ID
  const handleCopyWalletId = () => {
    navigator.clipboard.writeText(user.walletId);
    setMessage("Wallet ID copied!");
    setTimeout(() => setMessage(""), 2000);
  };

  // Logout Process with Animation and Redirection
  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      navigate("/auth"); // Redirect to Auth.js
    }, 1500);
  };

  return (
    <div className={`profile-container ${isLoggingOut ? "fade-out" : ""}`}>
      <div className="profile-card">
        {/* Profile Picture */}
        <FaUserCircle className="profile-icon" />
        <h1 className="profile-title">Profile</h1>

        {/* Hardcoded User Info */}
        <div className="profile-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p className="wallet-info">
            <strong>Wallet ID:</strong> {user.walletId}{" "}
            <FaCopy className="copy-icon" onClick={handleCopyWalletId} />
          </p>
          {message && <p className="copy-message">{message}</p>}
        </div>

        {/* Status Badge */}
        <span className={`status-badge ${user.status === "frequent" ? "badge-frequent" : "badge-new"}`}>
          {user.status === "frequent" ? "Frequent User" : "New User"}
        </span>

        {/* Logout Button */}
        <div className="profile-buttons">
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt className="icon" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
