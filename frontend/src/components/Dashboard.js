import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Example data (replace with real data from your backend)
  const userStats = {
    loanBalance: 15000,
    nextPaymentDue: "2023-12-01",
    recentTransactions: [
      { id: 1, amount: 5000, date: "2023-11-15", type: "Repayment" },
      { id: 2, amount: 10000, date: "2023-11-10", type: "Loan Disbursement" },
    ],
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2">Welcome to your financial dashboard.</p>

      {/* Quick Actions */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
          <Link
            to="/apply-loan"
            className="bg-blue-500 text-white p-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Apply for a Loan
          </Link>
          <Link
            to="/repay-loan"
            className="bg-green-500 text-white p-4 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
          >
            Repay Loan
          </Link>
          <Link
            to="/profile"
            className="bg-purple-500 text-white p-4 rounded-lg shadow-md hover:bg-purple-600 transition duration-300"
          >
            View Profile
          </Link>
        </div>
      </div>

      {/* User Statistics */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Your Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Loan Balance</h3>
            <p className="text-gray-700">Ksh {userStats.loanBalance}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Next Payment Due</h3>
            <p className="text-gray-700">{userStats.nextPaymentDue}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Recent Transactions</h3>
            <ul className="mt-2">
              {userStats.recentTransactions.map((transaction) => (
                <li key={transaction.id} className="text-gray-700">
                  {transaction.type}: Ksh {transaction.amount} on {transaction.date}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;