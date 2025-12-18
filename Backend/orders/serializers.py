from rest_framework import serializers
from django.shortcuts import get_object_or_404
from .models import Order, OrderItem
from products.models import Product

#Item Detail Serializer (Used for GET requests)
class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')
    
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'price', 'quantity']

# 2. General Order Serializer
class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = Order
        fields = [
            'id', 'first_name', 'last_name', 'email', 'address', 
            'postal_code', 'city', 'total_paid', 'status', 'items', 'created_at'
        ]

# 3. Create Serializer (Handles POST + Stock Validation)
class OrderCreateSerializer(serializers.ModelSerializer):
    items_data = serializers.ListField(
        child=serializers.DictField(), write_only=True
    )

    class Meta:
        model = Order
        fields = [
            'first_name', 'last_name', 'email', 'address', 
            'postal_code', 'city', 'items_data'
        ]

    def create(self, validated_data):
        items_data = validated_data.pop('items_data')
        user = self.context['request'].user
        
        # --- PHASE 1: PRE-SAVE VALIDATION ---
        # We check ALL items before creating the order. 
        # If one fails, the whole transaction stops.
        for item in items_data:
            product = get_object_or_404(Product, id=item['product_id'])
            requested_qty = int(item['quantity'])
            
            if product.stock < requested_qty:
                raise serializers.ValidationError(
                    f"STOCKED EXHAUSTED: {product.name} only has {product.stock} units remaining."
                )

        # --- PHASE 2: ORDER CREATION ---
        order = Order.objects.create(user=user, **validated_data)
        
        total_price = 0
        for item in items_data:
            product = Product.objects.get(id=item['product_id'])
            quantity = int(item['quantity'])
            
            # Deduct from Database
            product.stock -= quantity
            product.save()
            
            item_price = product.price
            total_price += item_price * quantity
            
            OrderItem.objects.create(
                order=order,
                product=product,
                price=item_price,
                quantity=quantity
            )
        
        # Finalize order total
        order.total_paid = total_price
        order.save()
        return order

# 4. Admin Status Serializer
class OrderStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['status']