import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ApplyLoan from "./pages/ApplyLoan";
import RepayLoan from "./pages/RepayLoan";
import Profile from "./pages/Profile";
import "./App.css";
import "./i18n"; // Import i18n configuration

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apply-loan" element={<ApplyLoan />} />
          <Route path="/repay-loan" element={<RepayLoan />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;