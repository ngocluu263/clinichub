from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.core.urlresolvers import reverse
from clinichub.models import *

def patient_profile(request):
    return render(request, 'patient/profile.html', {
        'page': 'profile',
        'username': request.session.get('username')
    })

def patient_sessions(request):
    return render(request, 'patient/sessions.html', {
        'page': 'sessions',
        'username': request.session.get('username')
    })

def patient_info(request):
    return render(request, 'patient/info.html', {
        'page': 'info',
        'username': request.session.get('username')
    })

def patient_payment(request):
    return render(request, 'patient/payment.html', {
        'page': 'payment',
        'username': request.session.get('username')
    })

def patient_appointments(request):
    return render(request, 'patient/appointments.html', {
        'page': 'appointments',
        'username': request.session.get('username')
    })

def patient_transcripts(request):
    return render(request, 'patient/transcripts.html', {
        'page': 'transcripts',
        'username': request.session.get('username')
    })
