from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse
from openpyxl import Workbook
from ..models import Task
from ..serializers import ReportExportSerializer



class ReportView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ReportExportSerializer
    
    def get(self, request):
        
        from_date = request.query_params.get('from')
        to_date = request.query_params.get('to')
        
        if from_date and to_date:
            tasks = Task.objects.filter(user=request.user, created_at__range=[from_date, to_date])
            
        else:
            tasks = Task.objects.filter(user=request.user)
        
        serializer = self.serializer_class(tasks, many=True)
        
        workbook = Workbook()
        sheet = workbook.active
        sheet.title = 'Tasks'
        
        headers = serializer.data[0].keys() if serializer.data else []
        sheet.append(list(headers))
        
        for task in serializer.data:
            sheet.append(list(task.values()))
            
        response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        response['Content-Disposition'] = 'attachment; filename="tasks.xlsx"'
        workbook.save(response)
        return response