from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.core.urlresolvers import reverse
from clinichub.models import *

def doctor_profile(request):
    if 'username' in request.session:
        if request.session.get('user_type') != 'doctor':
            return redirect(reverse('patient_profile'))
        else:
            return render(request, 'doctor/profile.html', {
                'page': 'profile',
            })
    else:
        return redirect(reverse('doctor_login'))

def doctor_sessions(request):
    if 'username' in request.session:
        if request.session.get('user_type') != 'doctor':
            return redirect(reverse('patient_profile'))
        else:
            try:
                user = Doctor.objects(username=request.session.get('username')).first()
                sessions = Session.objects(doctor=user)
                sessions_ = [{
                    'id': session.id,
                    'topic': session.topic,
                    'patient': session.patient.username,
                } for session in sessions] 
            except Exception as e:
                return render(request, 'doctor/sessions.html', {
                    'error_message': e.args[0]
                })
            return render(request, 'doctor/sessions.html', {
                'page': 'sessions',
                'sessions': sessions_
            })
    else:
        return redirect(reverse('doctor_login'))

def doctor_info(request):
    if 'username' in request.session:
        if request.session.get('user_type') != 'doctor':
            return redirect(reverse('patient_profile'))
        else:
            return render(request, 'doctor/info.html', {
                'page': 'info',
            })
    else:
        return redirect(reverse('doctor_login'))

def doctor_clinic(request):
    if 'username' in request.session:
        if request.session.get('user_type') != 'doctor':
            return redirect(reverse('patient_profile'))
        else:
            try:
                user = Doctor.objects(username=request.session.get('username')).first()
                doctor_ = {
                    'id': user.id, 
                    'clinic': user.clinic.id, 
                }
                return render(request, 'doctor/clinic.html', {
                    'page': 'clinic',
                    'doctor': doctor_
                })
            except Exception as e:
                return render(request, 'doctor/clinic.html', {
                    'error_message': e.args[0]
                })
    else:
        return redirect(reverse('doctor_login'))

def doctor_appointments(request):
    if 'username' in request.session:
        if request.session.get('user_type') != 'doctor':
            return redirect(reverse('patient_profile'))
        else:
            try:
                user = Doctor.objects(username=request.session.get('username')).first()
                appointments = Appointment.objects(doctor=user)
                appointments_ = [{
                    'id': appointment.id, 
                    'patient': appointment.patient.username, 
                    'time': appointment.time, 
                    'note': appointment.note, 
                } for appointment in appointments]
                return render(request, 'doctor/appointments.html', {
                    'page': 'appointments',
                    'appointments': appointments_
                })
            except Exception as e:
                return render(request, 'doctor/appointments.html', {
                    'error_message': e.args[0]
                })
    else:
        return redirect(reverse('doctor_login'))
