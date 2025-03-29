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
import Auth from "./pages/Auth"; // Import Auth component
import BillingDashboard from "./pages/BillingDashboard";
import CrossBorder from "./pages/CrossBorder";
import "./App.css";
import LoanManagement from "./pages/LoanManagement";

function PrivateRoute({ element, isAuthenticated }) {
  return isAuthenticated ? element : <Navigate to="/" />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <div className="main-content-container">
          <AnimatePresence mode="wait">
            <Routes>
              <Route
                path="/"
                element={<Auth setIsAuthenticated={setIsAuthenticated} />}
              />
              <Route
                path="/home"
                element={
                  <PrivateRoute
                    element={<AnimatedPage component={Home} />}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/wallet"
                element={
                  <PrivateRoute
                    element={<AnimatedPage component={Wallet} />}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/transfer"
                element={
                  <PrivateRoute
                    element={<AnimatedPage component={Transfer} />}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/request-payment"
                element={
                  <PrivateRoute
                    element={<AnimatedPage component={RequestPayment} />}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/savings"
                element={
                  <PrivateRoute
                    element={<AnimatedPage component={Savings} />}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/repay-loan"
                element={
                  <PrivateRoute
                    element={<AnimatedPage component={RepayLoan} />}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/apply-loan"
                element={
                  <PrivateRoute
                    element={<AnimatedPage component={ApplyLoan} />}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute
                    element={<AnimatedPage component={Profile} />}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/transactions"
                element={
                  <PrivateRoute
                    element={<AnimatedPage component={Transactions} />}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/billing-dashboard"
                element={
                  <PrivateRoute
                    element={<AnimatedPage component={BillingDashboard} />}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
              <Route
                path="/cross-border"
                element={
                  <PrivateRoute
                    element={<AnimatedPage component={CrossBorder} />}
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </Router>
  );
}

const AnimatedPage = ({ component: Component }) => (
  <motion.div
    initial={{ x: "100vw", opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: "-100vw", opacity: 0 }}
    transition={{ duration: 0.6, ease: "easeInOut" }}
  >
    <Component />
  </motion.div>
);

export default App;