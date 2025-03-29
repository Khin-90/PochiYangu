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
import CrossBorder from "./pages/CrossBorder"; // ✅ Import CrossBorder
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
                  <Route path="/wallet" element={<AnimatedPage component={Wallet} />} />
                  <Route path="/transfer" element={<AnimatedPage component={Transfer} />} />
                  <Route path="/explore" element={<AnimatedPage component={Explore} />} />
                  <Route path="/request-payment" element={<AnimatedPage component={RequestPayment} />} />
                  <Route path="/savings" element={<AnimatedPage component={Savings} />} />
                  <Route path="/repay-loan" element={<AnimatedPage component={RepayLoan} />} />
                  <Route path="/apply-loan" element={<AnimatedPage component={ApplyLoan} />} />
                  <Route path="/profile" element={<AnimatedPage component={Profile} />} />
                  <Route path="/transactions" element={<AnimatedPage component={Transactions} />} />
                  <Route path="/billing-dashboard" element={<AnimatedPage component={BillingDashboard} />} />
                  <Route path="/cross-border" element={<AnimatedPage component={CrossBorder} />} /> {/* ✅ Added Route */}
                </>
              )}
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </Router>
  );
}

// Reusable Animated Component Wrapper
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
