from rest_framework import serializers
from .models import Category, Product


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True
    )

    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'category', 'category_id', 'category_name',
            'name', 'slug', 'description', 'price', 'stock',
            'image', 'is_available', 'created_at',
        ]

    def get_image(self, obj):
        """Safe image URL for Cloudinary"""
        if not obj.image:
            return None
        try:
            # Most reliable way for django-cloudinary-storage
            return obj.image.url
        except Exception:
            return None