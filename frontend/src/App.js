import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home'; 
import Wallet from "./pages/wallet.js";
import Transfer from "./pages/Transfer.js";
import RequestPayment from "./pages/RequestPayment.js";
import Savings from "./pages/Savings.js";
import RepayLoan from "./pages/RepayLoan.js";
import ApplyLoan from "./pages/ApplyLoan.js";
import LoanForm from "./pages/LoanForm.js";
import Profile from "./pages/Profile.js";
import Transactions from "./pages/Transactions.js";
import Signup from "./pages/Signup.js";

function App() {
  return (
    <Router>
      {/* Remove or adjust the outer styling if you want a full-viewport layout */}
      <div className="min-h-screen p-6">
        <Routes>
          {/* Default path -> Signup */}
          <Route path="/" element={<Signup />} />
          <Route path="/home" element={<Home />} />
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
    </Router>
  );
}

export default App;
