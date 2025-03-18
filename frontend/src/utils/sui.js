import { JsonRpcProvider, SuiClient } from "@mysten/sui.js";

// Connect to Sui Devnet
const provider = new JsonRpcProvider("https://fullnode.devnet.sui.io:443");

export const suiClient = new SuiClient({ provider });

// Fetch wallet balance
export const getWalletBalance = async (address) => {
  try {
    const balance = await suiClient.getBalance(address);
    return balance;
  } catch (error) {
    console.error("Error fetching wallet balance:", error);
    return null;
  }
};

// Submit a loan application (example function)
export const submitLoanApplication = async (amount, walletAddress) => {
  try {
    // Call your smart contract here
    const response = await suiClient.executeTransaction({
      transaction: {
        kind: "moveCall",
        data: {
          packageObjectId: "your-package-id",
          module: "loans",
          function: "apply_loan",
          typeArguments: [],
          arguments: [amount, walletAddress],
        },
      },
      sender: walletAddress,
    });
    return response;
  } catch (error) {
    console.error("Error submitting loan application:", error);
    return null;
  }
};