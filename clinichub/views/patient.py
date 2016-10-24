from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404
from django.core.urlresolvers import reverse
from clinichub.models import *

def patient_profile(request):
    username = request.session.get('username')
    if username:
        return render(request, 'patient/profile.html', {
            'page': 'profile',
            'username': username
        })
    else:
        return redirect(reverse('login'))

def patient_sessions(request):
    username = request.session.get('username')
    if username:
        return render(request, 'patient/sessions.html', {
            'page': 'sessions',
            'username': request.session.get('username')
        })
    else:
        return redirect(reverse('login'))

def patient_info(request):
    username = request.session.get('username')
    if username:
        return render(request, 'patient/info.html', {
            'page': 'info',
            'username': request.session.get('username')
        })
    else:
        return redirect(reverse('login'))

def patient_payment(request):
    username = request.session.get('username')
    if username:
        return render(request, 'patient/payment.html', {
            'page': 'payment',
            'username': request.session.get('username')
        })
    else:
        return redirect(reverse('login'))

def patient_appointments(request):
    username = request.session.get('username')
    if username:
        return render(request, 'patient/appointments.html', {
            'page': 'appointments',
            'username': request.session.get('username')
        })
    else:
        return redirect(reverse('login'))

def patient_transcripts(request):
    username = request.session.get('username')
    if username:
        return render(request, 'patient/transcripts.html', {
            'page': 'transcripts',
            'username': request.session.get('username')
        })
    else:
        return redirect(reverse('login'))
