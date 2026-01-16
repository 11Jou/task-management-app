from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import *
from rest_framework.response import Response
from core.response import CustomResponse
from rest_framework.permissions import IsAuthenticated
from ..serializers import *
from ..models import Task
from django.db import transaction
from core.pagination import GlobalPagination
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from ..utils import read_excel_file


class ListCreateTaskView(ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = GlobalPagination
    filter_backends = [SearchFilter, DjangoFilterBackend]
    ordering_fields = ['created_at', 'updated_at']
    search_fields = ['title', 'description'] # search by title or description (contains)
    filterset_fields = ['status'] # filter by status
    
    
    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class RetrieveUpdateDestroyTaskView(RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'
    
    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)
    
    def perform_update(self, serializer):
        serializer.save(user=self.request.user)
    
    def perform_destroy(self, instance):
        instance.delete()
        
        

class BulkCreateTasksView(CreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=self.request.user)
        return CustomResponse.success(message='Tasks Created Successfully', data=serializer.data, status_code=status.HTTP_201_CREATED)
    
    

class BulkCreateTasksFromExcelView(APIView):
    serializer_class = BulkTaskExcelSerializer
    permission_classes = [IsAuthenticated]
    
    
    @transaction.atomic
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        file = serializer.validated_data.get('file')
        
        rows = read_excel_file(file)
        
        if not rows:
            return CustomResponse.error(message='No tasks found in the Excel file', 
                                        errors='No tasks found in the Excel file', 
                                        status_code=status.HTTP_400_BAD_REQUEST)
        
        try:
            tasks = [Task(user=request.user, **row) for row in rows]
            Task.objects.bulk_create(tasks)
            return CustomResponse.success(message='Tasks Created Successfully From Excel', 
                                          status_code=status.HTTP_201_CREATED)
        except Exception as e:
            print("Error: ", e)
            return CustomResponse.error(message="Failed to create tasks", 
                                        errors=str(e), 
                                        status_code=status.HTTP_400_BAD_REQUEST)
