from django.urls import path

from .views import *

urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    
    path('register/', UserRegistrationView.as_view(), name='user_registration'),
]