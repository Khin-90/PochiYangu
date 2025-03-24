import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [balance, setBalance] = useState("Loading...");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch Hedera wallet balance (Replace API with actual endpoint)
    axios.get("http://localhost:8000/api/wallet-balance")
      .then(response => setBalance(response.data.balance))
      .catch(error => console.error("Error fetching balance:", error));

    // Fetch transaction history (Replace API with actual endpoint)
    axios.get("http://localhost:8000/api/transactions")
      .then(response => setTransactions(response.data))
      .catch(error => console.error("Error fetching transactions:", error));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      {/* Wallet Balance Card */}
      <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Wallet Balance</h2>
          <p className="text-3xl font-bold mt-2">{balance} HBAR</p>
        </div>
        <button className="bg-white text-blue-600 px-4 py-2 rounded shadow-md hover:bg-gray-100">
          Add Funds
        </button>
      </div>

      {/* Recent Transactions */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-2 text-left">Txn ID</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((txn, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2">{txn.transaction_id}</td>
                  <td className="p-2">{txn.amount} HBAR</td>
                  <td className="p-2">{txn.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  No recent transactions
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
