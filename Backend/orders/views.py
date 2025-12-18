from rest_framework import viewsets, mixins, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Order
from .serializers import (
    OrderSerializer,
    OrderCreateSerializer,
    OrderStatusSerializer,
)


class IsOwnerOrAdmin(permissions.BasePermission):
    """Allow access only to the order owner or staff."""

    def has_object_permission(self, request, view, obj):
        return request.user.is_staff or obj.user == request.user


class OrderViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    """
    list:     GET   /orders/               — authenticated user's own orders
    create:   POST  /orders/               — place a new order
    retrieve: GET   /orders/{id}/          — order detail (owner or admin)
    status:   PATCH /orders/{id}/status/   — update status/payment (admin only)
    cancel:   POST  /orders/{id}/cancel/   — cancel own pending order
    """

    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]

    def get_queryset(self):
        qs = Order.objects.prefetch_related('items__product')
        if self.request.user.is_staff:
            return qs.all()
        return qs.filter(user=self.request.user)

    def get_serializer_class(self):
        if self.action == 'create':
            return OrderCreateSerializer
        if self.action == 'status':
            return OrderStatusSerializer
        return OrderSerializer

    # ------------------------------------------------------------------ #
    # Extra actions                                                        #
    # ------------------------------------------------------------------ #

    @action(detail=True, methods=['patch'], permission_classes=[permissions.IsAdminUser])
    def status(self, request, pk=None):
        """PATCH /orders/{id}/status/ — admin-only status & payment update."""
        order = self.get_object()
        serializer = self.get_serializer(order, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        """POST /orders/{id}/cancel/ — owner can cancel a Pending order."""
        order = self.get_object()

        if order.status != 'Pending':
            return Response(
                {'detail': f'Cannot cancel an order with status "{order.status}".'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        order.status = 'Cancelled'
        order.save(update_fields=['status', 'updated_at'])
        return Response(OrderSerializer(order, context={'request': request}).data)