import React, { useState, useEffect } from "react";
import axios from "axios";

const RequestPayment = () => {
  const [sender, setSender] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [senders, setSenders] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Fetch list of users who can send payments (optional)
    axios.get("http://localhost:8000/api/users")
      .then(response => setSenders(response.data))
      .catch(error => console.error("Error fetching senders:", error));
  }, []);

  const handleRequest = () => {
    if (!sender || !amount) {
      setError("Please fill in all fields.");
      return;
    }

    axios.post("http://localhost:8000/api/request-payment", { sender, amount, message })
      .then(response => {
        setSuccess("Payment request sent successfully!");
        setSender("");
        setAmount("");
        setMessage("");
        setError("");
      })
      .catch(error => {
        console.error("Request failed:", error);
        setError("Failed to send request. Try again.");
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Request Payment</h1>

      {/* Request Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Request Money</h2>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        {/* Sender Dropdown */}
        <label className="block text-gray-700 mb-2">Select Sender</label>
        <select 
          className="border p-2 w-full mb-4"
          value={sender} 
          onChange={(e) => setSender(e.target.value)}
        >
          <option value="">Choose a sender</option>
          {senders.map((user, index) => (
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

        {/* Message Input */}
        <label className="block text-gray-700 mb-2">Message (Optional)</label>
        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        {/* Request Button */}
        <button 
          onClick={handleRequest}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-600"
        >
          Request Payment
        </button>
      </div>
    </div>
  );
};

export default RequestPayment;
