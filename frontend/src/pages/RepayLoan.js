import React, { useState, useEffect } from "react";
import axios from "axios";

const RepayLoan = () => {
  const [loanDetails, setLoanDetails] = useState({
    loanAmount: 15000,
    interestRate: 10,
    amountDue: 16500,
    nextPaymentDate: "2023-12-01",
    minimumPayment: 5000,
  });
  
  const [paymentAmount, setPaymentAmount] = useState(loanDetails.minimumPayment);
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Simulating API call to get loan details
  useEffect(() => {
    // Replace with actual API call
    const fetchLoanDetails = async () => {
      try {
        setIsLoading(true);
        // Uncomment and modify when backend is ready
        // const response = await axios.get("http://localhost:8000/api/loan-details/");
        // setLoanDetails(response.data);
        
        // Simulating API delay
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        setError("Failed to load loan details. Please try again later.");
        setIsLoading(false);
        console.error("Error fetching loan details:", err);
      }
    };
    
    fetchLoanDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Uncomment and modify when backend is ready
      // await axios.post("http://localhost:8000/api/repay-loan/", {
      //   amount: paymentAmount,
      //   method: paymentMethod
      // });
      
      // Simulating API delay
      setTimeout(() => {
        setSuccess("Payment initiated successfully! Please check your phone to complete the transaction.");
        setIsSubmitting(false);
      }, 2000);
    } catch (err) {
      setError("Failed to process payment. Please try again later.");
      setIsSubmitting(false);
      console.error("Error processing payment:", err);
    }
  };

  if (isLoading) {
    return <div className="p-4 text-center">Loading loan details...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Repay Loan</h1>
      
      <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Loan Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-gray-600">Loan Amount</p>
            <p className="font-semibold">Ksh {loanDetails.loanAmount.toLocaleString()}</p>
          </div>
          
          <div>
            <p className="text-gray-600">Interest Rate</p>
            <p className="font-semibold">{loanDetails.interestRate}%</p>
          </div>
          
          <div>
            <p className="text-gray-600">Amount Due</p>
            <p className="font-semibold">Ksh {loanDetails.amountDue.toLocaleString()}</p>
          </div>
          
          <div>
            <p className="text-gray-600">Next Payment Date</p>
            <p className="font-semibold">{loanDetails.nextPaymentDate}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Make a Payment</h2>
        
        {error && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {success}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700">Payment Amount (Ksh)</label>
            <input
              type="number"
              min={1000}
              max={loanDetails.amountDue}
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(parseFloat(e.target.value))}
              className="border p-2 w-full rounded"
              required
            />
            <p className="text-sm text-gray-600 mt-1">
              Minimum payment: Ksh {loanDetails.minimumPayment.toLocaleString()}
            </p>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700">Payment Method</label>
            <div className="mt-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="mpesa"
                  name="paymentMethod"
                  value="mpesa"
                  checked={paymentMethod === "mpesa"}
                  onChange={() => setPaymentMethod("mpesa")}
                  className="mr-2"
                />
                <label htmlFor="mpesa">M-Pesa</label>
              </div>
              
              <div className="flex items-center mt-2">
                <input
                  type="radio"
                  id="bank"
                  name="paymentMethod"
                  value="bank"
                  checked={paymentMethod === "bank"}
                  onChange={() => setPaymentMethod("bank")}
                  className="mr-2"
                />
                <label htmlFor="bank">Bank Transfer</label>
              </div>
              
              <div className="flex items-center mt-2">
                <input
                  type="radio"
                  id="wallet"
                  name="paymentMethod"
                  value="wallet"
                  checked={paymentMethod === "wallet"}
                  onChange={() => setPaymentMethod("wallet")}
                  className="mr-2"
                />
                <label htmlFor="wallet">Wallet Balance</label>
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RepayLoan;