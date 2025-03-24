import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from hedera import Client, Hbar, TransferTransaction, AccountId, PrivateKey
from .models import Transaction, Savings, Loan, UserProfile  # Ensure your models exist

# Configure Hedera Client
HEDERA_OPERATOR_ID = AccountId.fromString("your-testnet-account-id")
HEDERA_OPERATOR_KEY = PrivateKey.fromString("your-private-key")

client = Client.forTestnet()
client.setOperator(HEDERA_OPERATOR_ID, HEDERA_OPERATOR_KEY)

# Fetch Wallet Balance (Mocked for now)
def get_wallet_balance(request):
    return JsonResponse({"balance": 500})  # Replace with actual Hedera API integration

# Fetch Transactions
def get_transactions(request):
    transactions = list(Transaction.objects.values())
    return JsonResponse(transactions, safe=False)

# Transfer Funds via Hedera
@csrf_exempt
def send_payment(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            recipient_id = AccountId.fromString(data.get("recipient_id"))
            amount = float(data.get("amount"))

            # Execute Hedera Transaction
            transaction = (
                TransferTransaction()
                .addHbarTransfer(HEDERA_OPERATOR_ID, Hbar(-amount))  # Sender
                .addHbarTransfer(recipient_id, Hbar(amount))  # Receiver
                .execute(client)
            )

            receipt = transaction.getReceipt(client)
            transaction_id = str(receipt.transactionId)

            # Save Transaction
            Transaction.objects.create(
                sender_id=str(HEDERA_OPERATOR_ID),
                recipient_id=str(recipient_id),
                amount=amount,
                transaction_id=transaction_id
            )

            return JsonResponse({"message": "Transaction successful!", "transaction_id": transaction_id})

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=400)

# Request Payment
@csrf_exempt
def request_payment(request):
    if request.method == "POST":
        data = json.loads(request.body)
        sender = data.get("sender")
        amount = float(data.get("amount"))
        message = data.get("message", "")

        return JsonResponse({"message": f"Payment request sent for {amount} HBAR from {sender}."})

# Apply for Loan
@csrf_exempt
def apply_loan(request):
    if request.method == "POST":
        data = json.loads(request.body)
        loan_amount = float(data.get("loanAmount"))

        loan = Loan.objects.create(amount=loan_amount, status="pending")
        return JsonResponse({"message": "Loan application submitted!", "loan_id": loan.id})

# Repay Loan
@csrf_exempt
def repay_loan(request):
    if request.method == "POST":
        data = json.loads(request.body)
        loan_id = data.get("loanId")
        amount = float(data.get("amount"))

        return JsonResponse({"message": f"Loan {loan_id} repaid with {amount} HBAR!"})

# Get User Profile
def get_user_profile(request):
    return JsonResponse({"name": "John Doe", "email": "john@example.com", "walletId": "0.0.12345", "status": "frequent"})

# Get Savings Balance
def get_savings_balance(request):
    return JsonResponse({"balance": 200})  # Replace with actual logic

# Deposit to Savings
@csrf_exempt
def deposit_savings(request):
    data = json.loads(request.body)
    return JsonResponse({"message": f"Deposited {data['amount']} HBAR into savings!"})

# Withdraw from Savings
@csrf_exempt
def withdraw_savings(request):
    data = json.loads(request.body)
    return JsonResponse({"message": f"Withdrew {data['amount']} HBAR from savings!"})
