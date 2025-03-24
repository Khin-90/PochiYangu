import React, { useState, useEffect } from "react";
import axios from "axios";

const ApplyLoan = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interest, setInterest] = useState(0);
  const [totalRepayment, setTotalRepayment] = useState(0);
  const [userStatus, setUserStatus] = useState("new"); // Default to new user
  const [loanLimit, setLoanLimit] = useState(100); // Default loan limit for new users
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Fetch user status & loan limit
    axios.get("http://localhost:8000/api/user-status")
      .then(response => {
        setUserStatus(response.data.status);
        setLoanLimit(response.data.loan_limit);
      })
      .catch(error => console.error("Error fetching user status:", error));
  }, []);

  useEffect(() => {
    if (loanAmount) {
      const interestRate = userStatus === "frequent" ? 5 : 10; // Lower interest for frequent users
      const calculatedInterest = (loanAmount * interestRate) / 100;
      setInterest(calculatedInterest);
      setTotalRepayment(parseFloat(loanAmount) + calculatedInterest);
    }
  }, [loanAmount, userStatus]);

  const handleApply = () => {
    if (!loanAmount || parseFloat(loanAmount) <= 0) {
      setError("Enter a valid loan amount.");
      return;
    }
    if (parseFloat(loanAmount) > loanLimit) {
      setError(`Loan request exceeds your limit of ${loanLimit} HBAR.`);
      return;
    }

    axios.post("http://localhost:8000/api/apply-loan", { loanAmount, interest })
      .then(response => {
        setSuccess("Loan application submitted successfully!");
        setLoanAmount("");
        setInterest(0);
        setTotalRepayment(0);
        setError("");
      })
      .catch(error => {
        console.error("Loan application failed:", error);
        setError("Loan application failed. Try again.");
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Apply for a Loan</h1>

      {/* Loan Application Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Loan Details</h2>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        {/* Loan Amount Input */}
        <label className="block text-gray-700 mb-2">Enter Loan Amount (HBAR)</label>
        <input
          type="number"
          placeholder="Enter amount"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        {/* Interest & Repayment Summary */}
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <p><strong>Interest Rate:</strong> {userStatus === "frequent" ? "5%" : "10%"}</p>
          <p><strong>Interest Amount:</strong> {interest} HBAR</p>
          <p><strong>Total Repayment:</strong> {totalRepayment} HBAR</p>
        </div>

        {/* Apply Button */}
        <button 
          onClick={handleApply}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-600"
        >
          Apply for Loan
        </button>
      </div>
    </div>
  );
};

export default ApplyLoan;
