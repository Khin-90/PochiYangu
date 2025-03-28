import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Explore from "./pages/Explore"; // ✅ Integrated Explore.js
// import supabase from "./supabaseClient"; // ⚠️ Commented out for now
// import Auth from "./pages/Auth"; // ⚠️ Commented out for now

/*
function PrivateRoute({ element }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    checkUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  return user ? element : <Navigate to="/auth" />;
}
*/

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow p-6">
          <Routes>
            {/* <Route path="/auth" element={<Auth />} /> */} 
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
            <Route path="/explore" element={<Explore />} /> {/* ✅ Explore added */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
