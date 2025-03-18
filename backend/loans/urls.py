from django.urls import path
from . import views

urlpatterns = [
    path("apply-loan/", views.apply_loan, name="apply_loan"),
]