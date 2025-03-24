from django.urls import path
from . import views

urlpatterns = [
    path("apply-loan/", views.apply_loan, name="apply_loan"),
    path("wallet-balance/", views.get_wallet_balance, name="wallet_balance"),
    path("transactions/", views.get_transactions, name="transactions"),
    path("transfer/", views.transfer_funds, name="transfer"),
    path("request-payment/", views.request_payment, name="request_payment"),
    path("repay-loan/", views.repay_loan, name="repay_loan"),
    path("user-profile/", views.get_user_profile, name="user_profile"),
    path("savings-balance/", views.get_savings_balance, name="savings_balance"),
    path("deposit-savings/", views.deposit_savings, name="deposit_savings"),
    path("withdraw-savings/", views.withdraw_savings, name="withdraw_savings"),
]
