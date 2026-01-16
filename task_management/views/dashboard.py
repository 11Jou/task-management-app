from rest_framework.views import APIView
from rest_framework.response import Response
from core.response import CustomResponse
from rest_framework.permissions import IsAuthenticated
from ..serializers import *
from ..models import Task
from django.db.models import Count, Q



class DashboardView(APIView):
    serializer_class = DashboardSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):
        stats = Task.objects.filter(user=request.user).aggregate(
            total_tasks=Count('id', distinct=True),
            total_completed_tasks=Count('id', filter=Q(status='completed'), distinct=True),
            total_in_progress_tasks=Count('id', filter=Q(status='in_progress'), distinct=True),
            total_pending_tasks=Count('id', filter=Q(status='pending'), distinct=True),
        )

        serializer = self.serializer_class(stats)
        return CustomResponse.success(message='Dashboard stats fetched successfully', data=serializer.data)
