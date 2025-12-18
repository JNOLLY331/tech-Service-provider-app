from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    # Password is write-only for security
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'phone_number', 'password', 'is_staff', 'is_superuser')
        # We make is_staff read_only so users can't make themselves admins during registration
        read_only_fields = ('is_staff', 'is_superuser')

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # what React sees after jwtDecode(token)
        token['first_name'] = user.first_name
        token['email'] = user.email
        token['is_staff'] = user.is_staff
        token['is_superuser'] = user.is_superuser

        return token