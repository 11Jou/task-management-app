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