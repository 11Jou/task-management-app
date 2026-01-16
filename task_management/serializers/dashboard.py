from rest_framework import serializers

class DashboardSerializer(serializers.Serializer):
    total_tasks = serializers.IntegerField(required=False, default=0)
    total_completed_tasks = serializers.IntegerField(required=False, default=0)
    total_in_progress_tasks = serializers.IntegerField(required=False, default=0)
    total_pending_tasks = serializers.IntegerField(required=False, default=0)