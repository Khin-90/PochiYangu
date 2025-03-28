import {
  Client,
  PrivateKey,
  AccountId,
  ContractCreateFlow,
  FileCreateTransaction,
} from "@hashgraph/sdk";
import fs from "fs";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

async function deployLoanContract() {
  try {
      // Ensure required environment variables are set
      if (!process.env.OPERATOR_ID || !process.env.OPERATOR_KEY) {
          throw new Error("Missing OPERATOR_ID or OPERATOR_KEY in .env file.");
      }

      // Connect to Hedera Testnet
      const client = Client.forTestnet();
      client.setOperator(
          AccountId.fromString(process.env.OPERATOR_ID),
          PrivateKey.fromString(process.env.OPERATOR_KEY)
      );

      console.log("🚀 Deploying smart contract...");

      // Read the compiled contract bytecode
      const contractBytecodePath = "./contracts/LoanContract_sol_LoanContract.bin";
      if (!fs.existsSync(contractBytecodePath)) {
          throw new Error(`Bytecode file not found: ${contractBytecodePath}`);
      }
      const contractBytecode = fs.readFileSync(contractBytecodePath);

      // Upload the contract bytecode to Hedera
      const fileCreateTx = new FileCreateTransaction()
          .setKeys([client.operatorPublicKey])
          .setContents(contractBytecode)
          .setMaxTransactionFee(5); // Set max transaction fee

      const fileCreateSubmit = await fileCreateTx.execute(client);
      const fileCreateReceipt = await fileCreateSubmit.getReceipt(client);
      const bytecodeFileId = fileCreateReceipt.fileId;

      console.log(`✅ Smart contract bytecode uploaded with File ID: ${bytecodeFileId}`);

      // Deploy the contract
      const contractCreateTx = new ContractCreateFlow()
          .setBytecodeFileId(bytecodeFileId)
          .setGas(1000000); // Set initial gas

      const contractCreateSubmit = await contractCreateTx.execute(client);
      const contractCreateReceipt = await contractCreateSubmit.getReceipt(client);
      const contractId = contractCreateReceipt.contractId;

      console.log(`🎉 Smart Contract Deployed! Contract ID: ${contractId}`);
      return contractId;
  } catch (error) {
      console.error("❌ Error deploying contract:", error.message);
  }
}

// Execute deployment
deployLoanContract();
