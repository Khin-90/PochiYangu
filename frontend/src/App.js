import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import LoanForm from "./pages/LoanForm";
import RepayLoan from "./pages/RepayLoan";
import Profile from "./pages/Profile";
import Savings from "./pages/Savings";
import Transfer from "./pages/Transfer";
import RequestPayment from "./pages/RequestPayment";
import Wallet from "./pages/Wallet";

function App() {
  return (
    <Router>
      {/* Navbar */}
      <Navbar />

      <div className="min-h-screen">
        {/* Routes */}
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />

          {/* Loan Pages */}
          <Route path="/apply-loan" element={<LoanForm />} />
          <Route path="/repay-loan" element={<RepayLoan />} />

          {/* Account Pages */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/wallet" element={<Wallet />} />

          {/* Financial Services */}
          <Route path="/savings" element={<Savings />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/request-payment" element={<RequestPayment />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </Router>
  );
}

export default App;