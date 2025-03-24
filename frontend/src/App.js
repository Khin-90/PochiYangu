import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Wallet from "./pages/wallet";
import Transfer from "./pages/Transfer";
import RequestPayment from "./pages/RequestPayment";
import Savings from "./pages/Savings";
import RepayLoan from "./pages/RepayLoan";
import ApplyLoan from "./pages/ApplyLoan";
import LoanForm from "./pages/LoanForm";
import Profile from "./pages/Profile";
import Transactions from "./pages/Transactions";

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
