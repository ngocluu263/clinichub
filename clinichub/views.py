from django.shortcuts import render
from .models import Employee

def index(request):
    employee = Employee.objects.create(
        email = "theuser@company.com",
        first_name = "FirstName",
        last_name = "LastName"
    )
    employee.save()
    return render(request, 'index.html')
