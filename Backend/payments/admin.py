from django.contrib import admin
from django.utils.html import format_html
from .models import MpesaPayment


@admin.register(MpesaPayment)
class MpesaPaymentAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'order',
        'phone_number',
        'amount',
        'mpesa_receipt',
        'status_badge',
        'created_at',
    ]
    list_filter = ['status', 'created_at']
    search_fields = ['phone_number', 'mpesa_receipt', 'checkout_request_id', 'order__id']
    readonly_fields = [
        'order',
        'checkout_request_id',
        'phone_number',
        'amount',
        'mpesa_receipt',
        'status',
        'result_desc',
        'created_at',
        'updated_at',
    ]
    fieldsets = (
        ('Order', {
            'fields': ('order', 'amount'),
        }),
        ('M-Pesa', {
            'fields': ('checkout_request_id', 'mpesa_receipt', 'phone_number'),
        }),
        ('Result', {
            'fields': ('status', 'result_desc'),
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',),
        }),
    )
    ordering = ['-created_at']
    list_per_page = 25

    STATUS_COLORS = {
        'Pending':   ('#b45309', '#fef3c7'),
        'Completed': ('#15803d', '#dcfce7'),
        'Failed':    ('#b91c1c', '#fee2e2'),
    }

    def status_badge(self, obj):
        color, bg = self.STATUS_COLORS.get(obj.status, ('#374151', '#f3f4f6'))
        return format_html(
            '<span style="padding:2px 8px;border-radius:9999px;font-size:12px;'
            'font-weight:600;color:{};background:{}">{}</span>',
            color, bg, obj.status,
        )
    status_badge.short_description = 'Status'

    def has_add_permission(self, request):
        return False  # payments are only created programmatically

    def has_delete_permission(self, request, obj=None):
        return False  # never delete payment records
