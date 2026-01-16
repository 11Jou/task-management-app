from rest_framework import serializers
from ..models import Task


class ReportExportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['title', 'description', 'status', 'created_at', 'updated_at']