from rest_framework import viewsets, generics, parsers, permissions
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer

# 🛡️ Custom Permission: Only Superusers
class IsSuperUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_superuser)

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.filter(is_available=True)
    serializer_class = ProductSerializer
    lookup_field = 'slug'
    
    # Use MultiPartParser to handle image uploads from your new Dashboard
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        - GET (list/retrieve): Anyone can see.
        - POST/PUT/DELETE: Only Superusers.
        """
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [IsSuperUser] # 🔒 Strict Superuser check
        return [permission() for permission in permission_classes]


class ProductCreateView(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]
    permission_classes = [IsSuperUser]