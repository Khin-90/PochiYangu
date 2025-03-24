import React, { useState, useEffect } from "react";
import axios from "axios";

const Savings = () => {
  const [savingsBalance, setSavingsBalance] = useState("Loading...");
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Fetch savings balance
    axios.get("http://localhost:8000/api/savings-balance")
      .then(response => setSavingsBalance(response.data.balance))
      .catch(error => console.error("Error fetching savings balance:", error));
  }, []);

  const handleTransaction = (type) => {
    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    if (type === "Withdraw" && parseFloat(amount) > parseFloat(savingsBalance)) {
      setError("Insufficient savings balance.");
      return;
    }

    axios.post(`http://localhost:8000/api/${type.toLowerCase()}-savings`, { amount })
      .then(response => {
        setSuccess(`${type} Successful!`);
        setSavingsBalance(type === "Deposit" 
          ? parseFloat(savingsBalance) + parseFloat(amount) 
          : parseFloat(savingsBalance) - parseFloat(amount));
        setAmount("");
        setError("");
        setIsDepositOpen(false);
        setIsWithdrawOpen(false);
      })
      .catch(error => {
        console.error(`${type} failed:`, error);
        setError(`${type} failed. Try again.`);
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Savings</h1>

      {/* Savings Balance Display */}
      <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Savings Balance</h2>
          <p className="text-3xl font-bold mt-2">{savingsBalance} HBAR</p>
        </div>
        <button onClick={() => window.location.reload()} className="bg-white text-yellow-600 px-4 py-2 rounded shadow-md hover:bg-gray-100">
          Refresh
        </button>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex space-x-4">
        <button onClick={() => setIsDepositOpen(true)} className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md w-full hover:bg-green-600">
          Deposit
        </button>
        <button onClick={() => setIsWithdrawOpen(true)} className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md w-full hover:bg-red-600">
          Withdraw
        </button>
      </div>

      {/* Deposit Modal */}
      {isDepositOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Deposit to Savings</h2>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <input 
              type="number" 
              placeholder="Amount" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              className="border p-2 w-full mb-4"
            />
            <div className="flex justify-between">
              <button onClick={() => handleTransaction("Deposit")} className="bg-green-500 text-white px-4 py-2 rounded">
                Confirm
              </button>
              <button onClick={() => setIsDepositOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {isWithdrawOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Withdraw from Savings</h2>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <input 
              type="number" 
              placeholder="Amount" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              className="border p-2 w-full mb-4"
            />
            <div className="flex justify-between">
              <button onClick={() => handleTransaction("Withdraw")} className="bg-red-500 text-white px-4 py-2 rounded">
                Confirm
              </button>
              <button onClick={() => setIsWithdrawOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Savings;
