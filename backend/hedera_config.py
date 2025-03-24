from hedera import Client, PrivateKey, AccountId

# Hedera Testnet Configuration
HEDERA_OPERATOR_ID = AccountId.fromString("your-testnet-account-id")
HEDERA_OPERATOR_KEY = PrivateKey.fromString("your-private-key")

client = Client.forTestnet()
client.setOperator(HEDERA_OPERATOR_ID, HEDERA_OPERATOR_KEY)
