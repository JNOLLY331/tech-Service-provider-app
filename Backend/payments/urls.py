from django.urls import path
from .views import MpesaCheckoutView, MpesaCallbackView

app_name = 'payments'

urlpatterns = [
    path('stk-push/', MpesaCheckoutView.as_view(), name='stk-push'),
    path('callback/', MpesaCallbackView.as_view(), name='mpesa-callback'),
]