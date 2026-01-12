from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import UserRegistrationSerializer
from .models import User
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
    
    
    
class UserRegistrationView(APIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)

    