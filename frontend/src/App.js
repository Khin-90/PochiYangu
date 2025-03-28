import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import Home from "./pages/Home.js";
import Dashboard from "./components/Dashboard.js";
import Wallet from "./pages/wallet.js";
import Transfer from "./pages/Transfer.js";
import RequestPayment from "./pages/RequestPayment.js";
import Savings from "./pages/Savings.js";
import RepayLoan from "./pages/RepayLoan.js";
import ApplyLoan from "./pages/ApplyLoan.js";
import LoanForm from "./pages/LoanForm.js";
import Profile from "./pages/Profile.js";
import Transactions from "./pages/Transactions.js";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/request-payment" element={<RequestPayment />} />
            <Route path="/savings" element={<Savings />} />
            <Route path="/repay-loan" element={<RepayLoan />} />
            <Route path="/apply-loan" element={<ApplyLoan />} />
            <Route path="/loan-form" element={<LoanForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/transactions" element={<Transactions />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;