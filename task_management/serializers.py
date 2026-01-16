from rest_framework import serializers
from .models import Task
from django.db import transaction



class BulkTaskSerializer(serializers.ListSerializer):
    @transaction.atomic
    def create(self, validated_data):
        user = self.context['request'].user
        tasks = [Task(user=user, **task_data) for task_data in validated_data]
        Task.objects.bulk_create(tasks)
        return tasks
    
    @transaction.atomic
    def create(self, validated_data):
        user = self.context['request'].user
        tasks = [Task(user=user, **task_data) for task_data in validated_data]
        Task.objects.bulk_create(tasks)
        return tasks
    
    

class BulkTaskExcelSerializer(serializers.Serializer):
    file = serializers.FileField()
    
    def validate_file(self, value):
        if not value.name.endswith('.xlsx') and not value.name.endswith('.xls'):
            raise serializers.ValidationError('File must be an Excel file (.xlsx or .xls) only')
        return value




class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'status', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
        
    @transaction.atomic
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
    
    
class DashboardSerializer(serializers.Serializer):
    total_tasks = serializers.IntegerField()
    total_completed_tasks = serializers.IntegerField()
    total_in_progress_tasks = serializers.IntegerField()
    total_pending_tasks = serializers.IntegerField()
    
    


class ReportExportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['title', 'description', 'status', 'created_at', 'updated_at']