import { useState } from "react";
import axios from "axios";

const LoanForm = () => {
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/apply-loan/", { amount });
      alert("Loan Application Submitted!");
    } catch (error) {
      console.error("Error submitting loan application", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <label className="block">Loan Amount:</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2">Apply</button>
    </form>
  );
};

export default LoanForm;
