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
import BillingDashboard from "./pages/BillingDashboard";
import "./App.css";
import LoanManagement from "./pages/LoanManagement";

function PrivateRoute({ element, isAuthenticated }) {
  return isAuthenticated ? element : <Navigate to="/" />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow p-6">
          <AnimatePresence mode="wait">
            <Routes>
              {/* Authentication Route */}
              <Route
                path="/"
                element={
                  !isAuthenticated ? (
                    <Auth onLogin={() => setIsAuthenticated(true)} />
                  ) : (
                    <Navigate to="/home" replace />
                  )
                }
              />

              {/* Protected Routes */}
              <Route
                path="/home"
                element={
                  <PrivateRoute
                    isAuthenticated={isAuthenticated}
                    element={
                      <motion.div
                        initial={{ x: "100vw", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "-100vw", opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      >
                        <Home />
                      </motion.div>
                    }
                  />
                }
              />

              {/* Other Protected Routes */}
              {[
                { path: "/wallet", component: Wallet },
                { path: "/transfer", component: Transfer },
                { path: "/request-payment", component: RequestPayment },
                { path: "/savings", component: Savings },
                { path: "/repay-loan", component: RepayLoan },
                { path: "/apply-loan", component: ApplyLoan },
                { path: "/profile", component: Profile },
                { path: "/transactions", component: Transactions },
                { path: "/explore", component: Explore },
                { path: "/billing-dashboard", component: BillingDashboard },
                { path: "/loanManagement", component: LoanManagement },
              ].map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <PrivateRoute
                      isAuthenticated={isAuthenticated}
                      element={
                        <motion.div
                          initial={{ x: "100vw", opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: "-100vw", opacity: 0 }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                        >
                          <route.component />
                        </motion.div>
                      }
                    />
                  }
                />
              ))}
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </Router>
  );
}

export default App;