import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./components/Dashboard";
import Wallet from "./pages/wallet";
import Transfer from "./pages/Transfer";
import RequestPayment from "./pages/RequestPayment";
import Savings from "./pages/Savings";
import RepayLoan from "./pages/RepayLoan";
import ApplyLoan from "./pages/ApplyLoan";
import LoanForm from "./pages/LoanForm";
import Profile from "./pages/Profile";
import Transactions from "./pages/Transactions";
import Explore from "./pages/Explore";
import Auth from "./pages/Auth";
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
        {isAuthenticated && <Navbar />}

        <div className="flex-grow p-6">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              {isAuthenticated && (
                <>
                  <Route
                    path="/dashboard"
                    element={
                      <motion.div
                        initial={{ x: "100vw", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "-100vw", opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      >
                        <Dashboard />
                      </motion.div>
                    }
                  />
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
                  {/* Add more routes with animations */}
                </>
              )}
            </Routes>
          </AnimatePresence>
        </div>

        {isAuthenticated && <Footer />}
      </div>
    </Router>
  );
}

export default App;
