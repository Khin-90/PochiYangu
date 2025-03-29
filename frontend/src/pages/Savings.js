import React, { useState } from "react";
import "../styles/Savings.css";


const Savings = () => {
  // Hardcoded balance & transactions
  const [savingsBalance, setSavingsBalance] = useState(500); // Start with 500 HBAR
  const [transactions, setTransactions] = useState([
    { id: 1, type: "Deposit", amount: 200, date: "2025-03-25" },
    { id: 2, type: "Withdraw", amount: 100, date: "2025-03-26" },
    { id: 3, type: "Deposit", amount: 150, date: "2025-03-27" }
  ]);
  
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [goal, setGoal] = useState(1000); // Hardcoded savings goal

  // Handle Deposit & Withdraw (updates local state only)
  const handleTransaction = (type) => {
    const numericAmount = parseFloat(amount);

    if (!numericAmount || numericAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    if (type === "Withdraw" && numericAmount > savingsBalance) {
      setError("Insufficient savings balance.");
      return;
    }

    // Update balance & transactions
    const newBalance = type === "Deposit" 
      ? savingsBalance + numericAmount 
      : savingsBalance - numericAmount;
    setSavingsBalance(newBalance);

    const newTransaction = {
      id: transactions.length + 1,
      type,
      amount: numericAmount,
      date: new Date().toISOString().split("T")[0]
    };
    setTransactions([newTransaction, ...transactions]);

    setSuccess(`${type} Successful!`);
    setAmount("");
    setError("");

    // Close modal after 1.5s
    setTimeout(() => {
      setIsDepositOpen(false);
      setIsWithdrawOpen(false);
      setSuccess("");
    }, 1500);
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

      {/* Transaction History */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-2">Transaction History</h2>
        {transactions.length > 0 ? (
          <ul className="text-sm">
            {transactions.map((tx) => (
              <li key={tx.id} className="flex justify-between p-2 border-b">
                <span>{tx.type}</span>
                <span>{tx.amount} HBAR</span>
                <span className={tx.type === "Deposit" ? "text-green-500" : "text-red-500"}>
                  {tx.date}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No recent transactions.</p>
        )}
      </div>

      {/* Savings Goal */}
      <div className="mt-6 bg-blue-100 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-2">Savings Goal</h2>
        <p>Target: {goal} HBAR</p>
        <div className="w-full bg-gray-300 rounded h-4 mt-2">
          <div
            className="bg-blue-500 h-4 rounded"
            style={{ width: `${(savingsBalance / goal) * 100}%` }}
          ></div>
        </div>
        <input 
          type="number" 
          value={goal} 
          onChange={(e) => setGoal(e.target.value)} 
          className="mt-2 p-2 border rounded w-full"
          placeholder="Set new goal"
        />
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
