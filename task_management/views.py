from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import *
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import TaskSerializer
from .models import Task
from core.pagination import GlobalPagination
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend



class ListCreateTaskView(ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    queryset = Task.objects.all()
    pagination_class = GlobalPagination
    filter_backends = [SearchFilter, DjangoFilterBackend]
    search_fields = ['title', 'description'] # search by title or description (contains)
    filterset_fields = ['status'] # filter by status
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class RetrieveTaskView(RetrieveAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    queryset = Task.objects.all()
    lookup_field = 'id'
    
        
        
        
    