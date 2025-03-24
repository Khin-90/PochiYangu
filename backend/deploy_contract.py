from hedera import Client, PrivateKey, ContractCreateTransaction, Hbar

# Hedera testnet credentials
OPERATOR_ID = "your-account-id"
OPERATOR_KEY = "your-private-key"

# Initialize Hedera client
client = Client.forTestnet()
client.setOperator(OPERATOR_ID, PrivateKey.fromString(OPERATOR_KEY))

# Read contract bytecode
with open("build/PochiYangu.bin", "r") as file:
    bytecode = file.read()

# Deploy smart contract
transaction = ContractCreateTransaction().setBytecode(bytecode).setGas(1000000)
tx_response = transaction.execute(client)
receipt = tx_response.getReceipt(client)
contract_id = receipt.contractId

print(f"✅ Contract Deployed on Hedera! Contract ID: {contract_id}")
