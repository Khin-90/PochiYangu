import React, { useState, useEffect } from "react";
import axios from "axios";

const Transfer = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("Loading...");
  const [recipients, setRecipients] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch wallet balance
    axios.get("http://localhost:8000/api/wallet-balance")
      .then(response => setBalance(response.data.balance))
      .catch(error => console.error("Error fetching balance:", error));

    // Fetch list of recipients (optional)
    axios.get("http://localhost:8000/api/users")
      .then(response => setRecipients(response.data))
      .catch(error => console.error("Error fetching recipients:", error));
  }, []);

  const handleTransfer = () => {
    if (!recipient || !amount) {
      setError("Please fill in all fields.");
      return;
    }
    if (parseFloat(amount) > parseFloat(balance)) {
      setError("Insufficient balance.");
      return;
    }
    
    axios.post("http://localhost:8000/api/transfer", { recipient, amount })
      .then(response => {
        alert("Transfer Successful!");
        setBalance(balance - amount);
        setRecipient("");
        setAmount("");
        setError("");
      })
      .catch(error => {
        console.error("Transfer failed:", error);
        setError("Transfer failed. Try again.");
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Transfer Money</h1>

      {/* Balance Display */}
      <div className="bg-blue-600 text-white p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-lg">Current Balance</h2>
        <p className="text-2xl font-bold">{balance} HBAR</p>
      </div>

      {/* Transfer Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Send Money</h2>
        
        {error && <p className="text-red-500">{error}</p>}

        {/* Recipient Dropdown */}
        <label className="block text-gray-700 mb-2">Recipient</label>
        <select 
          className="border p-2 w-full mb-4"
          value={recipient} 
          onChange={(e) => setRecipient(e.target.value)}
        >
          <option value="">Select Recipient</option>
          {recipients.map((user, index) => (
            <option key={index} value={user.wallet_id}>{user.name}</option>
          ))}
        </select>

        {/* Amount Input */}
        <label className="block text-gray-700 mb-2">Amount (HBAR)</label>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        {/* Send Button */}
        <button 
          onClick={handleTransfer}
          className="bg-green-500 text-white px-6 py-3 rounded-lg w-full hover:bg-green-600"
        >
          Send Money
        </button>
      </div>
    </div>
  );
};

export default Transfer;
