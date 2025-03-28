import { useState } from "react";
import { repayLoan } from "../utils/htsService";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const RepayLoan = () => {
  const [loans, setLoans] = useState([
    { id: 1, amount: 3000, interest: 300, status: "Pending" },
    { id: 2, amount: 7000, interest: 700, status: "Pending" },
  ]);

  const handleRepay = async (loanId, amount) => {
    try {
      await repayLoan(amount);
      setLoans(
        loans.map((loan) =>
          loan.id === loanId ? { ...loan, status: "Repaid" } : loan
        )
      );
      console.log(`Loan ${loanId} repaid successfully.`);
    } catch (error) {
      console.error(`Error repaying loan ${loanId}:`, error);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Repay Loans</h1>
      <div className="space-y-2">
        {loans.map((loan) => (
          <Card key={loan.id} className="p-4 border border-gray-300 rounded-lg shadow-md">
            <p className="text-lg font-semibold">Amount: Ksh {loan.amount}</p>
            <p className="text-sm text-gray-500">Interest: Ksh {loan.interest}</p>
            <p className={`text-sm font-bold ${loan.status === "Repaid" ? "text-green-500" : "text-red-500"}`}>
              Status: {loan.status}
            </p>
            {loan.status !== "Repaid" && (
              <Button className="mt-2" onClick={() => handleRepay(loan.id, loan.amount + loan.interest)}>
                Repay Loan
              </Button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RepayLoan;
