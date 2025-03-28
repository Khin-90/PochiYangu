import { useState } from "react";
import { createLoanToken, issueLoan, repayLoan } from "../utils/htsService";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const ApplyLoan = () => {
  const [loanAmount, setLoanAmount] = useState(0);
  const [interest, setInterest] = useState(0);
  const [loans, setLoans] = useState([
    { id: 1, amount: 3000, interest: 300, status: "Pending" },
    { id: 2, amount: 7000, interest: 700, status: "Pending" },
  ]);

  const calculateInterest = (amount) => {
    return amount * 0.1; // 10% interest for now
  };

  const handleApply = async () => {
    if (loanAmount <= 0) return;
    
    const newLoan = {
      id: loans.length + 1,
      amount: loanAmount,
      interest: calculateInterest(loanAmount),
      status: "Pending",
    };

    setLoans([...loans, newLoan]);
    setLoanAmount(0);
    setInterest(0);

    try {
      const tokenId = await createLoanToken(loanAmount);
      await issueLoan(tokenId, loanAmount);
      console.log("Loan successfully issued on Hedera.");
    } catch (error) {
      console.error("Hedera loan transaction failed:", error);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Apply for a Loan</h1>
      <Card className="p-4 border border-gray-300 rounded-lg shadow-md">
        <Input
          type="number"
          placeholder="Enter loan amount"
          value={loanAmount}
          onChange={(e) => {
            setLoanAmount(Number(e.target.value));
            setInterest(calculateInterest(Number(e.target.value)));
          }}
        />
        <p className="text-sm text-gray-500 mt-2">Interest: Ksh {interest}</p>
        <Button className="mt-2" onClick={handleApply}>
          Apply Loan
        </Button>
      </Card>
      <div className="space-y-2">
        <h2 className="text-lg font-bold">My Loans</h2>
        {loans.map((loan) => (
          <Card key={loan.id} className="p-4 border border-gray-300 rounded-lg shadow-md">
            <p className="text-lg font-semibold">Amount: Ksh {loan.amount}</p>
            <p className="text-sm text-gray-500">Interest: Ksh {loan.interest}</p>
            <p className="text-sm font-bold text-red-500">Status: {loan.status}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ApplyLoan;
