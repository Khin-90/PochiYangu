import React, { useState, useEffect } from "react";
import axios from "axios";

const RepayLoan = () => {
  const [loans, setLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState("");
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("Loading...");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Fetch wallet balance
    axios.get("http://localhost:8000/api/wallet-balance")
      .then(response => setBalance(response.data.balance))
      .catch(error => console.error("Error fetching balance:", error));

    // Fetch active loans
    axios.get("http://localhost:8000/api/loans")
      .then(response => setLoans(response.data))
      .catch(error => console.error("Error fetching loans:", error));
  }, []);

  const handleRepay = () => {
    if (!selectedLoan || !amount || parseFloat(amount) <= 0) {
      setError("Please select a loan and enter a valid amount.");
      return;
    }
    if (parseFloat(amount) > parseFloat(balance)) {
      setError("Insufficient wallet balance.");
      return;
    }
    
    setIsConfirmOpen(true);
  };

  const confirmRepayment = () => {
    axios.post("http://localhost:8000/api/repay-loan", { loan_id: selectedLoan, amount })
      .then(response => {
        setSuccess("Loan repaid successfully!");
        setBalance(balance - amount);
        setAmount("");
        setSelectedLoan("");
        setError("");
        setIsConfirmOpen(false);
      })
      .catch(error => {
        console.error("Repayment failed:", error);
        setError("Repayment failed. Try again.");
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Repay Loan</h1>

      {/* Loan Repayment Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Make a Repayment</h2>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        {/* Loan Selection Dropdown */}
        <label className="block text-gray-700 mb-2">Select Loan</label>
        <select 
          className="border p-2 w-full mb-4"
          value={selectedLoan} 
          onChange={(e) => setSelectedLoan(e.target.value)}
        >
          <option value="">Choose a loan</option>
          {loans.map((loan, index) => (
            <option key={index} value={loan.id}>
              Loan #{loan.id} - {loan.amount} HBAR (Due: {loan.due_date})
            </option>
          ))}
        </select>

        {/* Amount Input */}
        <label className="block text-gray-700 mb-2">Amount to Repay (HBAR)</label>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        {/* Repay Button */}
        <button 
          onClick={handleRepay}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-600"
        >
          Repay Loan
        </button>
      </div>

      {/* Confirmation Modal */}
      {isConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Loan Repayment</h2>
            <p>You are about to repay <strong>{amount} HBAR</strong> for Loan ID <strong>{selectedLoan}</strong>.</p>
            <div className="flex justify-between mt-4">
              <button onClick={confirmRepayment} className="bg-green-500 text-white px-4 py-2 rounded">
                Confirm
              </button>
              <button onClick={() => setIsConfirmOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RepayLoan;
