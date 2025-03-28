import React from 'react';
import '../styles/Signup.css'; // Make sure this import points to the correct CSS file

const Signup = () => {
  return (
    <div className="signup-page">
      {/* Background Shapes */}
      <div className="bg-shape shape1"></div>
      <div className="bg-shape shape2"></div>

      {/* Main Container */}
      <div className="signup-container">
        {/* Left Section: Form */}
        <div className="left-section">
          <h1 className="main-title">Pochi</h1>
          <form className="signup-form">
            <label htmlFor="username" className="label">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="input-field"
              placeholder="pochiyangu@finhack.io"
            />

            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="input-field"
              placeholder="********"
            />

            <div className="button-group">
              <button type="button" className="btn signup-btn">
                Sign Up
              </button>
              <button type="button" className="btn getstarted-btn">
                Get started
              </button>
            </div>
          </form>
        </div>

        {/* Right Section: Image/Chart Preview */}
        <div className="right-section">
          <img
            src="https://via.placeholder.com/300x300.png?text=Analytics+Preview"
            alt="Analytics Preview"
            className="preview-img"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
