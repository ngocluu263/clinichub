from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404
from django.core.urlresolvers import reverse
from clinichub.models import *

def patient_profile(request):
    if 'username' in request.session:
        return render(request, 'patient/profile.html', {
            'page': 'profile',
        })
    else:
        return redirect(reverse('login'))

def patient_sessions(request):
    if 'username' in request.session:
        return render(request, 'patient/sessions.html', {
            'page': 'sessions',
        })
    else:
        return redirect(reverse('login'))

def patient_info(request):
    if 'username' in request.session:
        return render(request, 'patient/info.html', {
            'page': 'info',
        })
    else:
        return redirect(reverse('login'))

def patient_payment(request):
    if 'username' in request.session:
        return render(request, 'patient/payment.html', {
            'page': 'payment',
        })
    else:
        return redirect(reverse('login'))

def patient_appointments(request):
    if 'username' in request.session:
        return render(request, 'patient/appointments.html', {
            'page': 'appointments',
        })
    else:
        return redirect(reverse('login'))

def patient_transcripts(request):
    if 'username' in request.session:
        return render(request, 'patient/transcripts.html', {
            'page': 'transcripts',
        })
    else:
        return redirect(reverse('login'))
