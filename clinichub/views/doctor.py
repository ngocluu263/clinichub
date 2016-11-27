from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.core.urlresolvers import reverse
from clinichub.models import *

def doctor_profile(request):
    if 'username' in request.session:
        if request.session.get('user_type') != 'doctor':
            return redirect(reverse('patient_profile'))
        else:
            return redirect(reverse('doctor_info'))
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
            user = Doctor.objects(username=request.session.get('username')).first()
            return render(request, 'doctor/info.html', {
                'page': 'info',
                'user': user
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
                if user.clinic:
                    doctor_ = {
                        'id': user.id, 
                        'clinic': user.clinic.id, 
                    }
                else :
                    doctor_ = {
                        'id': user.id
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

def doctor_create_clinic(request):
    if 'username' in request.session:
        if request.session.get('user_type') != 'doctor':
            return redirect(reverse('patient_profile'))
        else:

            if request.method == 'POST':
                try:
                    name = request.POST.get('name', 'Unnamed clinic')
                    description = request.POST.get('description', '')

                    clinic = Clinic.objects.create(name=name, description=description, price=100)
                    if not clinic:
                        raise Exception('Create clinic fail')

                    doctor = Doctor.objects(username=request.session.get('username')).first()
                    if not doctor:
                        raise Exception('Doctor not found')
                    doctor.clinic = clinic
                    doctor.save()
                    return redirect(reverse('doctor_clinic'))
                except Exception as e:
                    return render('doctor/create_clinic.html', {
                        'error_message': e.args[0]
                    })
            else:
                try:
                    doctor = Doctor.objects(username=request.session.get('username')).first()
                    if doctor.clinic:
                        return redirect(reverse('doctor_clinic'))
                    return render(request, 'doctor/create_clinic.html', {
                        'page': 'clinic'    
                    })
                except Exception as e:
                    return render(request, 'doctor/create_clinic.html', {
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
                    'appointments': appointments_,
                    'user_id': user.id
                })
            except Exception as e:
                return render(request, 'doctor/appointments.html', {
                    'error_message': e.args[0]
                })
    else:
        return redirect(reverse('doctor_login'))
