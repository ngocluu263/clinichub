from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.core.urlresolvers import reverse
from clinichub.models import *

def appointment(request, appointment_id):
    if 'username' in request.session:
        try:
            appointment = Appointment.objects(id=appointment_id).first() 
            if not appointment:
                raise Exception('Appointment not found.')
            username = request.session.get('username')
            user_type = request.session.get('user_type')
            if user_type == 'patient':
                user = Patient.objects(username=username).first()
            else:
                user = Doctor.objects(username=username).first()
            if user == appointment.patient or user == appointment.doctor:
                appointment_ = {
                    'doctor': appointment.doctor.username,
                    'patient': appointment.patient.username,
                    'note': appointment.note,
                    'time': appointment.time
                }
                return render(request, 'appointment/appointment.html', {
                    'appointment': appointment_    
                })
            else:
                raise Exception('You do not have a permission to view this appointment.')
        except Exception as e:
            return render(request, 'appointment/appointment.html', {
                'error_message': e.args[0]   
            })
        return render(request, 'appointment/appointment.html', {
            'appointment': appointment_    
        })
    else:
        return redirect(reverse('index'))
