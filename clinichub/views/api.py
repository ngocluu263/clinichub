from django.shortcuts import render
from django.http import HttpResponse
from clinichub.models import *
import json

def get_doctors_by_clinic(clinic):
    doctor_list = filter(lambda doctor: doctor.clinic == clinic, Doctor.objects.all())
    return [{ 'username': doctor.username, 'field': doctor.field } for doctor in doctor_list]

def get_fields_by_clinic(clinic):
    doctor_list = get_doctors_by_clinic(clinic)
    field_list = []
    for doctor in doctor_list:
        field_list.append(doctor['field'])
    return list(set(field_list))

def get_all_clinics(request):
    clinic_list = [{'id': str(clinic.id), 'name': clinic.clinic_name, 'description': clinic.clinic_description, 'fields': get_fields_by_clinic(clinic)} for clinic in Clinic.objects.all()]
    return HttpResponse(json.dumps({ 'clinics': clinic_list }), content_type='application/json')
    
