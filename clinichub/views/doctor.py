from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.core.urlresolvers import reverse
from clinichub.models import *

def doctor_profile(request):
    return HttpResponse('Doctor profile')

def doctor_sessions(request):
    return HttpResponse('Doctor sessions')

def doctor_info(request):
    return HttpResponse('Doctor info')

def doctor_clinic(request):
    return HttpResponse('Doctor clinic management')

def doctor_appointments(request):
    return HttpResponse('Doctor appointments')
