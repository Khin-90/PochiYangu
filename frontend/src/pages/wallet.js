import React, { useState, useEffect } from "react";
import axios from "axios";

const Wallet = () => {
  const [balance, setBalance] = useState("Loading...");
  const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
  const [isSendMoneyOpen, setIsSendMoneyOpen] = useState(false);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/api/wallet-balance")
      .then(response => setBalance(response.data.balance))
      .catch(error => console.error("Error fetching balance:", error));
  }, []);

  const handleTransaction = (type) => {
    console.log(`${type} ${amount} HBAR`);
    setAmount("");
    setIsAddMoneyOpen(false);
    setIsSendMoneyOpen(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Wallet</h1>

      {/* Wallet Balance Card */}
      <div className="bg-green-600 text-white p-6 rounded-lg shadow-md flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Your Balance</h2>
          <p className="text-3xl font-bold mt-2">{balance} HBAR</p>
        </div>
        <button onClick={() => window.location.reload()} className="bg-white text-green-600 px-4 py-2 rounded shadow-md hover:bg-gray-100">
          Refresh
        </button>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex space-x-4">
        <button onClick={() => setIsAddMoneyOpen(true)} className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md w-full hover:bg-blue-600">
          Add Money
        </button>
        <button onClick={() => setIsSendMoneyOpen(true)} className="bg-purple-500 text-white px-6 py-3 rounded-lg shadow-md w-full hover:bg-purple-600">
          Send Money
        </button>
      </div>

      {/* Add Money Modal */}
      {isAddMoneyOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add Money</h2>
            <input 
              type="number" 
              placeholder="Amount" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              className="border p-2 w-full mb-4"
            />
            <div className="flex justify-between">
              <button onClick={() => handleTransaction("Added")} className="bg-blue-500 text-white px-4 py-2 rounded">
                Confirm
              </button>
              <button onClick={() => setIsAddMoneyOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Send Money Modal */}
      {isSendMoneyOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Send Money</h2>
            <input 
              type="number" 
              placeholder="Amount" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              className="border p-2 w-full mb-4"
            />
            <div className="flex justify-between">
              <button onClick={() => handleTransaction("Sent")} className="bg-purple-500 text-white px-4 py-2 rounded">
                Confirm
              </button>
              <button onClick={() => setIsSendMoneyOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
