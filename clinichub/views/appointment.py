from django.shortcuts import render
from django.http import HttpResponse

def appointment(request, appointment_id):
    return HttpResponse('appointment '+ appointment_id)

def appointment_create(request):
    return HttpResponse('appointment_create')
