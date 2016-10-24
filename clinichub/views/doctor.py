from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.core.urlresolvers import reverse
from clinichub.models import *

def doctor_profile(request):
    if 'username' in request.session:
        return render(request, 'doctor/profile.html', {
            'page': 'profile',
        })
    else:
        return redirect(reverse('doctor_login'))

def doctor_sessions(request):
    if 'username' in request.session:
        return render(request, 'doctor/sessions.html', {
            'page': 'sessions',
        })
    else:
        return redirect(reverse('doctor_login'))

def doctor_info(request):
    if 'username' in request.session:
        return render(request, 'doctor/info.html', {
            'page': 'info',
        })
    else:
        return redirect(reverse('doctor_login'))

def doctor_clinic(request):
    if 'username' in request.session:
        return render(request, 'doctor/clinic.html', {
            'page': 'clinic',
        })
    else:
        return redirect(reverse('doctor_login'))

def doctor_appointments(request):
    if 'username' in request.session:
        return render(request, 'doctor/appointments.html', {
            'page': 'appointments',
        })
    else:
        return redirect(reverse('doctor_login'))
