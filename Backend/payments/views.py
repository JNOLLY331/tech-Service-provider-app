from django.shortcuts import get_object_or_404
from django.db import transaction
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.permissions import AllowAny

from orders.models import Order
from .utils import MpesaClient
from .models import MpesaPayment


class MpesaCheckoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        order_id = request.data.get('order_id')
        phone_number = request.data.get('phone_number')

        if not order_id or not phone_number:
            return Response(
                {"error": "order_id and phone_number are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        order = get_object_or_404(Order, id=order_id, user=request.user)

        # Guard: don't push if already paid
        if order.payment_status == 'Completed':
            return Response(
                {"error": "Order is already paid"},
                status=status.HTTP_400_BAD_REQUEST
            )

        amount = order.get_total_cost()
        if not amount:
            return Response(
                {"error": "Order has no items to charge"},
                status=status.HTTP_400_BAD_REQUEST
            )

        mpesa = MpesaClient()
        response = mpesa.stk_push(
            phone_number=phone_number,
            amount=amount,
            order_id=order.id
        )

        if response.get('ResponseCode') == '0':
            checkout_id = response.get('CheckoutRequestID')

            # Log the pending transaction — don't touch order_key
            MpesaPayment.objects.create(
                order=order,
                checkout_request_id=checkout_id,
                phone_number=phone_number,
                amount=amount,
                status='Pending',
            )

            return Response({
                "message": "STK Push initiated successfully",
                "checkout_id": checkout_id
            }, status=status.HTTP_200_OK)

        return Response({
            "error": "Failed to initiate STK Push",
            "details": response
        }, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(csrf_exempt, name='dispatch')
class MpesaCallbackView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        callback_data = request.data.get('Body', {}).get('stkCallback', {})
        result_code = callback_data.get('ResultCode')
        checkout_id = callback_data.get('CheckoutRequestID')
        result_desc = callback_data.get('ResultDesc')

        with transaction.atomic():
            try:
                payment = MpesaPayment.objects.select_related('order').get(
                    checkout_request_id=checkout_id
                )
            except MpesaPayment.DoesNotExist:
                return Response(
                    {"ResultCode": 1, "ResultDesc": "Payment record not found"},
                    status=status.HTTP_404_NOT_FOUND
                )

            order = payment.order

            if result_code == 0:
                # Extract transaction metadata from callback items
                items = {
                    i['Name']: i.get('Value')
                    for i in callback_data.get('CallbackMetadata', {}).get('Item', [])
                }
                payment.mpesa_receipt = items.get('MpesaReceiptNumber')
                payment.amount = items.get('Amount', payment.amount)
                payment.status = 'Completed'
                payment.result_desc = result_desc
                payment.save()

                order.payment_status = 'Completed'
                order.total_paid = payment.amount
                order.save()

            else:
                payment.status = 'Failed'
                payment.result_desc = result_desc
                payment.save()

                order.payment_status = 'Failed'
                order.save()

        # Always return 200 to Safaricom — they retry on non-200
        return Response(
            {"ResultCode": 0, "ResultDesc": "Success"},
            status=status.HTTP_200_OK
        )