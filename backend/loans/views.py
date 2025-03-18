import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Loan
from sui_utils import submit_loan_application  # Your Sui utility function

@csrf_exempt
def apply_loan(request):
    if request.method == "POST":
        data = json.loads(request.body)
        amount = data.get("amount")
        wallet_address = data.get("wallet_address")

        # Submit loan application to Sui blockchain
        sui_response = submit_loan_application(amount, wallet_address)

        if sui_response:
            # Save loan details in Django database
            loan = Loan.objects.create(amount=amount, wallet_address=wallet_address)
            return JsonResponse({"message": "Loan application submitted!", "loan_id": loan.id})
        else:
            return JsonResponse({"error": "Failed to submit loan application to Sui blockchain"}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=400)