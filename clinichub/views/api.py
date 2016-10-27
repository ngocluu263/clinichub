from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from mongoengine import *
from clinichub.models import *
from django.views.decorators.csrf import csrf_exempt
import json
import datetime

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
    return JsonResponse({ 'clinics': clinic_list })
    
@csrf_exempt
def create_session(request):
    topic = request.POST.get('topic', 'Unnamed session')
    description = request.POST.get('description', '')
    username = request.session.get('username') or 'bobby'
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
        return JsonResponse({ 'error_message': e.args[0] })
    else:
        return JsonResponse({
            'clinics': clinic_,
            'doctor': doctor_,
            'session': session_ })

@csrf_exempt
def get_session(request):
    session_id = request.POST.get('session_id','581134d44f5d211a49545691')
    try:
        session = Session.objects(id=session_id).first()
        if not session:
            raise ValidationError("Session not found.")
        session_ = {
            'id': str(session.id),
            'topic': session.topic,
            'patient': session.ses_patient.username,
            'doctor': session.ses_doctor.username}
        messages = [{ 'msg': msg.msg, 'sender': msg.sender, 'time': msg.timestamp } for msg in session.message]
        session_['messages'] = messages
    except ValidationError as e:
        return JsonResponse({ 'error_message': e.args[0] })
    return JsonResponse({'session': session_ })
        
@csrf_exempt
def create_transcript(request):
    body = json.loads(request.body.decode("utf-8"))
    try:
        if request.session.get('user_type') == 'doctor':
            doctor = request.session.get('user').id 
        else:
            doctor = '580f6de35a95ef3bbb446033'
        patient = Patient.objects(id=body['patient']).first()
        transcript = Transcript.objects.create(doctor=doctor, patient=patient, note=body['note'], drugs=body['drugs'])
        transcript_ = {
            'id': str(transcript.id),
            'doctor': transcript.doctor.username,
            'patient': transcript.patient.username,
            'drugs': [{ 'name': drug.name, 'amount': drug.amount, 'usage': drug.usage } for drug in transcript.drugs]}
    except Exception as e:
        return JsonResponse({ 'error_message': e.args[0] })
    return JsonResponse({'transcript': transcript_ })

@csrf_exempt
def create_appointment(request):
    body = json.loads(request.body.decode("utf-8"))
    try:
        if request.session.get('user_type') == 'doctor':
            doctor = request.session.get('user').id 
        else:
            doctor = '580f6de35a95ef3bbb446033'
        patient = Patient.objects(id=body['patient']).first()
        appointment = Appointment.objects.create(doctor=doctor, patient=patient, note=body['note'], time=datetime.datetime.fromtimestamp(int(body['time'])))
        appointment_ = {
            'id': str(appointment.id),
            'doctor': appointment.doctor.username,
            'patient': appointment.patient.username,
            'note': appointment.note,
            'time': appointment.time}
    except Exception as e:
        return JsonResponse({ 'error_message': e.args[0] })
    return JsonResponse(appointment_)
