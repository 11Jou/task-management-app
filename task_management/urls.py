from django.urls import path
from .views import *


urlpatterns = [
    path('', ListTaskView.as_view(), name='list_task'),
    path('<int:id>/', RetrieveTaskView.as_view(), name='retrieve_task'),
]