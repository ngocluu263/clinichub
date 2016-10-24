from django.shortcuts import render
from django.http import HttpResponse

def session(request, session_id):
    return HttpResponse('session '+ session_id)

def session_create(request):
    return HttpResponse('session_create')
