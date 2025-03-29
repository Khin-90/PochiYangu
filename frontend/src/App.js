import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Wallet from "./pages/wallet";
import Transfer from "./pages/Transfer";
import RequestPayment from "./pages/RequestPayment";
import Savings from "./pages/Savings";
import RepayLoan from "./pages/RepayLoan";
import ApplyLoan from "./pages/ApplyLoan";
import Profile from "./pages/Profile";
import Transactions from "./pages/Transactions";
import Explore from "./pages/Explore";
import Auth from "./pages/Auth";
import BillingDashboard from "./pages/BillingDashboard"; // ✅ Import BillingDashboard
import "./App.css";

function PrivateRoute({ element, isAuthenticated }) {
  return isAuthenticated ? element : <Navigate to="/" />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {!isAuthenticated && <Auth onLogin={() => setIsAuthenticated(true)} />}

        <div className="flex-grow p-6">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              {isAuthenticated && (
                <>
                  <Route
                    path="/wallet"
                    element={
                      <motion.div
                        initial={{ x: "100vw", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "-100vw", opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      >
                        <Wallet />
                      </motion.div>
                    }
                  />
                  <Route
                    path="/transfer"
                    element={
                      <motion.div
                        initial={{ x: "100vw", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "-100vw", opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      >
                        <Transfer />
                      </motion.div>
                    }
                  />
                  <Route
                    path="/explore"
                    element={
                      <motion.div
                        initial={{ x: "100vw", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "-100vw", opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      >
                        <Explore />
                      </motion.div>
                    }
                  />
                  <Route
                    path="/request-payment"
                    element={
                      <motion.div
                        initial={{ x: "100vw", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "-100vw", opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      >
                        <RequestPayment />
                      </motion.div>
                    }
                  />
                  <Route
                    path="/savings"
                    element={
                      <motion.div
                        initial={{ x: "100vw", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "-100vw", opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      >
                        <Savings />
                      </motion.div>
                    }
                  />
                  <Route
                    path="/repay-loan"
                    element={
                      <motion.div
                        initial={{ x: "100vw", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "-100vw", opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      >
                        <RepayLoan />
                      </motion.div>
                    }
                  />
                  <Route
                    path="/apply-loan"
                    element={
                      <motion.div
                        initial={{ x: "100vw", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "-100vw", opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      >
                        <ApplyLoan />
                      </motion.div>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <motion.div
                        initial={{ x: "100vw", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "-100vw", opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      >
                        <Profile />
                      </motion.div>
                    }
                  />
                  <Route
                    path="/transactions"
                    element={
                      <motion.div
                        initial={{ x: "100vw", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "-100vw", opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      >
                        <Transactions />
                      </motion.div>
                    }
                  />
                  <Route
                    path="/billing-dashboard" // ✅ Added route for BillingDashboard
                    element={
                      <motion.div
                        initial={{ x: "100vw", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "-100vw", opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      >
                        <BillingDashboard />
                      </motion.div>
                    }
                  />
                </>
              )}
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </Router>
  );
}

export default App;
