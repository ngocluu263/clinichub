from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.core.urlresolvers import reverse
from clinichub.models import *

def prescription(request, prescription_id):
    if 'username' in request.session:
        try:
            prescription = Prescription.objects(id=prescription_id).first() 
            if not prescription:
                raise Exception('Prescription not found.')
            username = request.session.get('username')
            user_type = request.session.get('user_type')
            if user_type == 'patient':
                user = Patient.objects(username=username).first()
            else:
                user = Doctor.objects(username=username).first()
            if user == prescription.patient or user == prescription.doctor:
                prescription_ = {
                    'doctor': prescription.doctor.username,
                    'patient': prescription.patient.username,
                    'note': prescription.note,
                    'drugs': prescription.drugs
                }
                return render(request, 'prescription/prescription.html', {
                    'prescription': prescription_    
                })
            else:
                raise Exception('You do not have a permission to view this prescription.')
        except Exception as e:
            return render(request, 'prescription/prescription.html', {
                'error_message': e.args[0]   
            })
        return render(request, 'prescription/prescription.html', {
            'prescription': prescription_    
        })
    else:
        return redirect(reverse('index'))
