from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import *
from .models import User
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from core.response import CustomResponse
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.exceptions import ValidationError

    
    
    
class UserRegistrationView(APIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            field, messages = next(iter(e.detail.items()))
            message = messages[0]            
            return CustomResponse.error(message=message, errors=e.detail)
        except Exception as e:
            return CustomResponse.error(message="Invalid data", errors="Registration failed. Please try again.")
        user = serializer.save()
        return CustomResponse.created(data=serializer.data, message='User registered successfully')
    
    
    
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            return CustomResponse.error(message="Invalid username or password", errors="Login failed. Please try again.")
        return CustomResponse.success(data=serializer.validated_data, message='User Login successfully')
    
    
class CustomTokenRefreshView(TokenRefreshView):
    serializer_class = CustomTokenRefreshSerializer

    