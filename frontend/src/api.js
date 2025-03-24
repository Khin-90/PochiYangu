import axios from "axios";

// Base API URL (Update if needed)
const API_BASE_URL = "http://localhost:8000/api";

// Fetch Wallet Balance
export const getWalletBalance = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/wallet-balance/`);
    return response.data.balance;
  } catch (error) {
    console.error("Error fetching wallet balance:", error.response?.data || error.message);
    return null;
  }
};

// Fetch Transactions
export const getTransactions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transactions/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error.response?.data || error.message);
    return [];
  }
};

// Transfer Funds
export const transferFunds = async (recipient, amount) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/transfer/`, {
      recipient,
      amount,
    });
    return response.data;
  } catch (error) {
    console.error("Transfer failed:", error.response?.data || error.message);
    return null;
  }
};

// Request Payment
export const requestPayment = async (sender, amount, message) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/request-payment/`, {
      sender,
      amount,
      message,
    });
    return response.data;
  } catch (error) {
    console.error("Payment request failed:", error.response?.data || error.message);
    return null;
  }
};

// Apply for Loan
export const applyForLoan = async (loanAmount) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/apply-loan/`, {
      loanAmount,
    });
    return response.data;
  } catch (error) {
    console.error("Loan application failed:", error.response?.data || error.message);
    return null;
  }
};

// Repay Loan
export const repayLoan = async (loanId, amount) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/repay-loan/`, {
      loanId,
      amount,
    });
    return response.data;
  } catch (error) {
    console.error("Loan repayment failed:", error.response?.data || error.message);
    return null;
  }
};

// Fetch User Profile
export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user-profile/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error.response?.data || error.message);
    return null;
  }
};

// Fetch Savings Balance
export const getSavingsBalance = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/savings-balance/`);
    return response.data.balance;
  } catch (error) {
    console.error("Error fetching savings balance:", error.response?.data || error.message);
    return null;
  }
};

// Deposit to Savings
export const depositSavings = async (amount) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/deposit-savings/`, { amount });
    return response.data;
  } catch (error) {
    console.error("Savings deposit failed:", error.response?.data || error.message);
    return null;
  }
};

// Withdraw from Savings
export const withdrawSavings = async (amount) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/withdraw-savings/`, { amount });
    return response.data;
  } catch (error) {
    console.error("Savings withdrawal failed:", error.response?.data || error.message);
    return null;
  }
};
