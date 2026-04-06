from rest_framework import serializers
from .models import Category, Product


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']


class ProductSerializer(serializers.ModelSerializer):
    # For READ: expose full category object + a flat name for cards
    category = CategorySerializer(read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)

    # For WRITE: accept the category ID from the admin form
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True
    )

    # Absolute image URL so the frontend never has to construct it manually
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'category', 'category_id', 'category_name',
            'name', 'slug', 'description',
            'price', 'stock', 'image', 'is_available', 'created_at',
        ]

    def get_image(self, obj):
        """Return a fully-qualified URL for the image, or None."""
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None

    def create(self, validated_data):
        return Product.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance