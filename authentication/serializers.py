from rest_framework import serializers
from .models import User


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
            raise serializers.ValidationError("Email already exists")
        return value
    
    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create_user(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
    
