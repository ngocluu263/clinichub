from django.shortcuts import render
from django.http import HttpResponse
from mongoengine import *
from clinichub.models import *
import json
from django.views.decorators.csrf import csrf_exempt

def get_doctors_by_clinic(clinic):
    doctor_list = filter(lambda doctor: doctor.clinic == clinic, Doctor.objects.all())
    return [{ 'username': doctor.username, 'field': doctor.field } for doctor in doctor_list]

def get_fields_by_clinic(clinic):
    doctor_list = get_doctors_by_clinic(clinic)
    field_list = []
    for doctor in doctor_list:
        field_list.append(doctor['field'])
    return list(set(field_list))

@csrf_exempt
def get_all_clinics(request):
    clinic_list = [{'id': str(clinic.id), 'name': clinic.clinic_name, 'description': clinic.clinic_description, 'fields': get_fields_by_clinic(clinic)} for clinic in Clinic.objects.all()]
    return HttpResponse(json.dumps({ 'clinics': clinic_list }), content_type='application/json')
    
@csrf_exempt
def create_session(request):
    topic = request.POST.get('topic', 'Unnamed session')
    description = request.POST.get('description', '')
    username = 'bobby'
    try:
        clinic = Clinic.objects(id=request.POST.get('clinic')).first()
        doctor = Doctor.objects(clinic=clinic, field=request.POST.get('field')).first()
        doctor_ = { 'id': str(doctor.id), 'username': doctor.username }
        clinic_ = { 'id': str(clinic.id), 'name': clinic.clinic_name }
        patient = Patient.objects(username=username).first()
        session = Session.objects.create(topic=topic, ses_patient=patient, ses_doctor=doctor)
        message = Message(msg=description, sender='P')
        session.message.append(message)
        session.save()
        session_ = { 'id': str(session.id), 'topic': session.topic, 'description': session.message[0].msg}
    except ValidationError as e:
        return HttpResponse(json.dumps({ 'error_message': e.args[0] }),
            content_type='application/json')
    else:
        return HttpResponse(json.dumps({
            'clinics': clinic_,
            'doctor': doctor_,
            'session': session_ }),
            content_type='application/json')
