from django.urls import path
from .views import *


urlpatterns = [
    path('', ListCreateTaskView.as_view(), name='list_create_task'),
    path('<int:id>/', RetrieveUpdateDestroyTaskView.as_view(), name='retrieve_update_destroy_task'),
    path('bulk/', BulkCreateTasksView.as_view(), name='bulk_create_tasks'),
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
]