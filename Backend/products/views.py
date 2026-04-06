from rest_framework import viewsets, generics, parsers, permissions


class IsSuperUser(permissions.BasePermission):
    """Only Django superusers can create/edit/delete products."""
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_superuser)


from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    GET  /api/products/categories/       — list all categories (public)
    GET  /api/products/categories/{id}/  — single category (public)
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]


class ProductViewSet(viewsets.ModelViewSet):
    """
    GET    /api/products/items/           — list available products (public)
    GET    /api/products/items/{slug}/    — single product detail (public)
    POST   /api/products/items/           — create product (superuser)
    PUT    /api/products/items/{slug}/    — update product (superuser)
    DELETE /api/products/items/{slug}/    — delete product (superuser)
    """
    serializer_class = ProductSerializer
    lookup_field = 'slug'

    # Accept both JSON and multipart (image uploads)
    parser_classes = [
        parsers.MultiPartParser,
        parsers.FormParser,
        parsers.JSONParser,
    ]

    def get_queryset(self):
        """
        Superusers see ALL products (for management).
        Everyone else only sees available ones.
        """
        if self.request.user.is_authenticated and self.request.user.is_superuser:
            return Product.objects.all()
        return Product.objects.filter(is_available=True)

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [IsSuperUser()]

    def get_serializer_context(self):
        """Pass request into serializer so image URLs are absolute."""
        context = super().get_serializer_context()
        context['request'] = self.request
        return context