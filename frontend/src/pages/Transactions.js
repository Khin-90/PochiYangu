import React, { useState, useEffect } from "react";
import axios from "axios";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    axios.get("http://localhost:8000/api/transactions")
      .then(response => setTransactions(response.data))
      .catch(error => console.error("Error fetching transactions:", error));
  }, []);

  const filteredTransactions = transactions.filter(txn => 
    filter === "all" || txn.type === filter
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Transaction History</h1>

      {/* Filter Buttons */}
      <div className="flex space-x-4 mb-4">
        {["all", "deposit", "withdrawal", "transfer"].map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded ${
              filter === type ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Transactions Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-2 text-left">Txn ID</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((txn, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2">{txn.transaction_id}</td>
                  <td className="p-2 capitalize">{txn.type}</td>
                  <td className="p-2">{txn.amount} HBAR</td>
                  <td className="p-2">{txn.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
