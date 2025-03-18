import React from "react";

const RepayLoan = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Repay Your Loan</h1>
      <p className="mt-2">Manage and repay your loans here.</p>
      <div className="mt-4">
        <p>
          To repay your loan, please follow the instructions below:
        </p>
        <ul className="list-disc list-inside mt-2">
          <li>Check your loan balance.</li>
          <li>Choose a repayment method (e.g., mobile money, bank transfer).</li>
          <li>Confirm your payment.</li>
        </ul>
      </div>
    </div>
  );
};

export default RepayLoan;