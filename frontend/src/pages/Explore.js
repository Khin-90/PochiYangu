import React, { useEffect, useState } from "react";
import { FaSearch, FaStar } from "react-icons/fa";
import "../styles/Explore.css";

const recommendations = [
  { title: "Loan Insights", image: "/images/Loan_insights.jpg" },
  { title: "Stablecoin Basics", image: "/images/stablecoin_basics.jpg" },
  { title: "Secure Transactions", image: "/images/secure_transactions.jpg" },
];

const ExploreFinancialOptions = () => {
  const [hovered, setHovered] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setOffset((prevOffset) => (prevOffset + 1) % recommendations.length);
      }, 3000); // Move every 3 seconds
      return () => clearInterval(interval);
    }
  }, [hovered]);

  return (
    <div className="explore-container">
      <h1 className="explore-title">Explore Financial Options</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search transactions" className="search-input" />
        <button className="search-button">
          <FaSearch className="search-icon" /> Search
        </button>
      </div>

      {/* Recent Searches */}
      <div className="section">
        <h2 className="section-title">Recent Searches</h2>
        <div className="tags">
          {["Loan Management", "Stablecoin Support", "Hedera Hashgraph", "Dark Mode"].map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="section">
        <h2 className="section-title">Categories</h2>
        <div className="checkbox-group">
          {["Loan", "Stablecoin", "Cross-border", "Hedera"].map((category) => (
            <label key={category} className="checkbox-label">
              <input type="checkbox" className="checkbox-input" /> {category}
            </label>
          ))}
        </div>
      </div>

      {/* Security & User Experience */}
      <div className="grid-container">
        <div className="security">
          <h2 className="section-title">Security</h2>
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="star-icon" />
            ))}
          </div>
        </div>
        <div className="user-experience">
          <h2 className="section-title">User Experience</h2>
          <div className="checkbox-group">
            {["Beginner", "Intermediate", "Professional"].map((level) => (
              <label key={level} className="checkbox-label">
                <input type="checkbox" className="checkbox-input" /> {level}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended for You - Carousel */}
      <div className="section">
        <h2 className="section-title">Recommended for You</h2>
        <div
          className="carousel"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${offset * 100}%)`,
              transition: "transform 0.7s ease-in-out",
            }}
          >
            {recommendations.map((item, index) => (
              <div
                key={index}
                className="recommendation-card"
                style={{
                  transform: hovered ? "scale(1.05)" : "scale(1)",
                  transition: "transform 0.3s ease-in-out",
                }}
              >
                <img src={item.image} alt={item.title} className="recommendation-image" />
                <p className="recommendation-title">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreFinancialOptions;
