from django.shortcuts import render
from rest_framework import viewsets
from .models import EmployeeModel
from .serializers import EmployeeSerializer
from rest_framework.pagination import PageNumberPagination
# Create your views here.

class EmployeeViewset(viewsets.ModelViewSet):
    queryset = EmployeeModel.objects.all().order_by('-id')
    serializer_class = EmployeeSerializer
    pagination_class = PageNumberPagination


