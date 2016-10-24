from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.core.urlresolvers import reverse
from clinichub.models import *

def patient_profile(request):
    return render(request, 'account/profile.html', {
        'username': request.session.get('username')
    })

def patient_sessions(request):
    return HttpResponse('Patient sessions')

def patient_info(request):
    return HttpResponse('Patient info')

def patient_payment(request):
    return HttpResponse('Patient payment')

def patient_appointments(request):
    return HttpResponse('Patient appointments')

def patient_transcripts(request):
    return HttpResponse('Patient transcripts')
