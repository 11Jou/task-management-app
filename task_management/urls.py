from django.urls import path
from .views import *


urlpatterns = [
    path('', ListCreateTaskView.as_view(), name='list_create_task'),
    path('<int:id>/', RetrieveTaskView.as_view(), name='retrieve_task'),
]