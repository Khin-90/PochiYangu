import React from "react";
import LoanForm from "../components/LoanForm";

const ApplyLoan = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Apply for a Loan</h1>
      <p className="mt-2">Fill out the form below to apply for a loan.</p>
      <div className="mt-4">
        <LoanForm />
      </div>
    </div>
  );
};

export default ApplyLoan;