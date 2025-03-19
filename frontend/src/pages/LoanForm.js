import React, { useState, useEffect } from "react";
import axios from "axios";

const LoanForm = () => {
  const [amount, setAmount] = useState(0);
  const [interest, setInterest] = useState(0);
  const [isEligible, setIsEligible] = useState(true);

  // Simulate eligibility check (replace with actual API call)
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/check-eligibility/")
      .then((response) => {
        setIsEligible(response.data.is_eligible);
      })
      .catch((error) => {
        console.error("Error checking eligibility:", error);
      });
  }, []);

  // Calculate interest based on the loan amount
  useEffect(() => {
    const calculatedInterest = amount * 0.1; // 10% interest rate
    setInterest(calculatedInterest);
  }, [amount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEligible) {
      axios
        .post("http://localhost:8000/api/apply-loan/", { amount, interest })
        .then((response) => {
          alert(`Loan application submitted! ${response.data.message}`);
        })
        .catch((error) => {
          console.error("Error submitting loan application:", error);
          alert("Failed to submit loan application.");
        });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Apply for a Loan</h1>
      {!isEligible ? (
        <div className="mt-4 bg-green-100 p-4 rounded-lg">
          <p className="text-lg">So sorry! We can't offer you a loan right now.</p>
          <p className="mt-2">
            We're sorry but unfortunately you do not qualify for a loan because you were late to pay your previous loan. Thank you.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4">
          <label className="block">Loan Amount (Ksh):</label>
          <input
            type="range"
            min="0"
            max="100000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full"
          />
          <p className="text-lg mt-2">Amount: Ksh {amount}</p>

          <label className="block mt-4">Interest (10%):</label>
          <input
            type="range"
            min="0"
            max={amount * 0.1}
            value={interest}
            readOnly
            className="w-full"
          />
          <p className="text-lg mt-2">Interest: Ksh {interest}</p>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 mt-4"
          >
            Apply
          </button>
        </form>
      )}
    </div>
  );
};

export default LoanForm;