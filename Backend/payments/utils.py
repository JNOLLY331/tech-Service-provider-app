import requests
import base64
from datetime import datetime
from django.conf import settings
from django.core.exceptions import ImproperlyConfigured
from django.core.cache import cache


class MpesaClient:
    def __init__(self):
        required = [
            'MPESA_CONSUMER_KEY', 'MPESA_CONSUMER_SECRET',
            'MPESA_SHORTCODE', 'MPESA_PASSKEY', 'MPESA_CALLBACK_URL'
        ]
        for key in required:
            if not getattr(settings, key, None):
                raise ImproperlyConfigured(f"Missing required setting: {key}")

        self.consumer_key = settings.MPESA_CONSUMER_KEY
        self.consumer_secret = settings.MPESA_CONSUMER_SECRET
        self.shortcode = settings.MPESA_SHORTCODE
        self.passkey = settings.MPESA_PASSKEY
        self.callback_url = settings.MPESA_CALLBACK_URL
        self.base_url = "https://sandbox.safaricom.co.ke"

    def format_phone(self, phone_number):
        phone = str(phone_number).strip().replace(" ", "")
        if phone.startswith("+"):
            phone = phone[1:]
        if phone.startswith("0"):
            phone = "254" + phone[1:]
        return phone

    def get_token(self):
        token = cache.get('mpesa_token')
        if token:
            return token
        url = f"{self.base_url}/oauth/v1/generate?grant_type=client_credentials"
        try:
            response = requests.get(url, auth=(self.consumer_key, self.consumer_secret))
            response.raise_for_status()
            token = response.json().get('access_token')
            cache.set('mpesa_token', token, timeout=3500)
            return token
        except Exception as e:
            print(f"Error getting M-Pesa token: {e}")
            return None

    def stk_push(self, phone_number, amount, order_id):
        token = self.get_token()
        if not token:
            return {"Error": "Failed to generate access token"}

        timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
        password = base64.b64encode(
            f"{self.shortcode}{self.passkey}{timestamp}".encode()
        ).decode('utf-8')

        payload = {
            "BusinessShortCode": self.shortcode,
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": int(amount),
            "PartyA": self.format_phone(phone_number),
            "PartyB": self.shortcode,
            "PhoneNumber": self.format_phone(phone_number),
            "CallBackURL": self.callback_url,
            "AccountReference": f"Order_{order_id}",
            "TransactionDesc": f"Payment for Order {order_id}"
        }

        try:
            response = requests.post(
                f"{self.base_url}/mpesa/stkpush/v1/processrequest",
                json=payload,
                headers={"Authorization": f"Bearer {token}"}
            )
            response.raise_for_status()
            return response.json()
        except requests.exceptions.HTTPError:
            return {"Error": "STK push failed", "details": response.json()}
        except requests.exceptions.RequestException as e:
            return {"Error": str(e)}