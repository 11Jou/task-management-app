from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer


class UserRegistrationSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['email', 'name', 'password', 'confirm_password']
        
    def validate_password(self, value):
        if value != self.initial_data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match")
        return value
    
    
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(message="Email already exists", errors="Email already exists")
        return value
    
    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create_user(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
    

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(self, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['name'] = user.name
        return token
    
    
    def validate(self, attrs):
        try:
            data = super().validate(attrs)
            refresh = self.get_token(self.user)
            data['name'] = self.user.name
            data['email'] = self.user.email
            data['refresh'] = str(refresh)
            data['access'] = str(refresh.access_token)
            return data
        except Exception as e:
            raise AuthenticationFailed(e)
    
    
class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        try:
            data = super().validate(attrs)
            return data
        except Exception as e:
            raise serializers.ValidationError(e)