from django.db import models
from django.contrib.auth.models import AbstractUser
from .manager import UserManager

class User(AbstractUser):
    username = None
    first_name = None
    last_name = None
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']
    
    
    objects = UserManager()
    
    def __str__(self):
        return self.email