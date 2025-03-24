import React, { useState } from "react";
import axios from "axios";

const LoanForm = ({ loanAmount, interest, totalRepayment }) => {
  const [repaymentPeriod, setRepaymentPeriod] = useState("");
  const [collateral, setCollateral] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = () => {
    if (!repaymentPeriod || !collateral) {
      setError("All fields are required.");
      return;
    }

    axios.post("http://localhost:8000/api/confirm-loan", { 
      loanAmount, interest, totalRepayment, repaymentPeriod, collateral 
    })
      .then(response => {
        setSuccess("Loan request submitted successfully!");
        setError("");
      })
      .catch(error => {
        console.error("Loan request failed:", error);
        setError("Loan submission failed. Try again.");
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Loan Confirmation</h1>

      {/* Loan Summary */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-4">
        <h2 className="text-xl font-semibold mb-2">Loan Details</h2>
        <p><strong>Amount:</strong> {loanAmount} HBAR</p>
        <p><strong>Interest:</strong> {interest} HBAR</p>
        <p><strong>Total Repayment:</strong> {totalRepayment} HBAR</p>
      </div>

      {/* Loan Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        {/* Repayment Period */}
        <label className="block text-gray-700 mb-2">Repayment Period (months)</label>
        <input
          type="number"
          placeholder="Enter repayment period"
          value={repaymentPeriod}
          onChange={(e) => setRepaymentPeriod(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        {/* Collateral */}
        <label className="block text-gray-700 mb-2">Collateral (if required)</label>
        <input
          type="text"
          placeholder="Enter collateral details"
          value={collateral}
          onChange={(e) => setCollateral(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        {/* Submit Button */}
        <button 
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-600"
        >
          Submit Loan Request
        </button>
      </div>
    </div>
  );
};

export default LoanForm;
