from django.urls import path
from .views import MyTokenObtainPairView, RegisterView, UserProfileView

app_name='core'
urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', UserProfileView.as_view(), name='profile'),
]