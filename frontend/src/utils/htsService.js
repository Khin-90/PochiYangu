import { Client, TokenCreateTransaction, TokenMintTransaction, TokenBurnTransaction, TransferTransaction, PrivateKey, AccountId } from "@hashgraph/sdk";

const operatorId = AccountId.fromString("0.0.5767694");
const operatorKey = PrivateKey.fromString("0x3b02aba6a519a56a13bf909fa4c3dda538f2b931ba871908adf7d6d94747b2b2");
const client = Client.forTestnet().setOperator(operatorId, operatorKey);

export const createLoanToken = async (loanAmount, borrowerId) => {
    try {
        const transaction = new TokenCreateTransaction()
            .setTokenName("PochiLoan")
            .setTokenSymbol("PLT")
            .setTreasuryAccountId(operatorId)
            .setInitialSupply(0)
            .setMaxSupply(loanAmount)
            .freezeWith(client);
        
        const signedTx = await transaction.sign(operatorKey);
        const response = await signedTx.execute(client);
        const receipt = await response.getReceipt(client);
        
        return receipt.tokenId.toString();
    } catch (error) {
        console.error("Error creating loan token:", error);
    }
};

export const issueLoan = async (tokenId, loanAmount, borrowerId) => {
    try {
        const mintTx = new TokenMintTransaction()
            .setTokenId(tokenId)
            .setAmount(loanAmount)
            .freezeWith(client)
            .sign(operatorKey);
        
        await mintTx.execute(client);
        
        const transferTx = new TransferTransaction()
            .addTokenTransfer(tokenId, operatorId, -loanAmount)
            .addTokenTransfer(tokenId, borrowerId, loanAmount)
            .freezeWith(client)
            .sign(operatorKey);
        
        await transferTx.execute(client);
    } catch (error) {
        console.error("Error issuing loan:", error);
    }
};

export const repayLoan = async (tokenId, repaymentAmount, borrowerId) => {
    try {
        const transferTx = new TransferTransaction()
            .addTokenTransfer(tokenId, borrowerId, -repaymentAmount)
            .addTokenTransfer(tokenId, operatorId, repaymentAmount)
            .freezeWith(client)
            .sign(operatorKey);
        
        await transferTx.execute(client);
        
        const burnTx = new TokenBurnTransaction()
            .setTokenId(tokenId)
            .setAmount(repaymentAmount)
            .freezeWith(client)
            .sign(operatorKey);
        
        await burnTx.execute(client);
    } catch (error) {
        console.error("Error repaying loan:", error);
    }
};
