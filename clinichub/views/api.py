from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from mongoengine import *
from clinichub.models import *
from django.views.decorators.csrf import csrf_exempt
import json
import datetime
import time

def get_doctors_by_clinic(clinic):
    doctor_list = filter(lambda doctor: doctor.clinic == clinic, Doctor.objects.all())
    return [{ 'username': doctor.username, 'field': doctor.field } for doctor in doctor_list]

def get_fields_by_clinic(clinic):
    doctor_list = get_doctors_by_clinic(clinic)
    field_list = []
    for doctor in doctor_list:
        field_list.append(doctor['field'])
    return list(set(field_list))

def format_date(date):
    return time.strftime('%s', date.timetuple())

@csrf_exempt
def get_all_clinics(request):
    clinic_list = [{'id': str(clinic.id), 'name': clinic.name, 'description': clinic.description, 'fields': get_fields_by_clinic(clinic)} for clinic in Clinic.objects.all()]
    return JsonResponse({ 'clinics': clinic_list })
    
@csrf_exempt
def create_session(request):
    body = json.loads(request.body.decode("utf-8"))
    try:
        topic = body['topic']
        description = body['description']
        patient_username = body['patient']['username']
        field = body['field']
        clinic_id = body['clinic']

        clinic = Clinic.objects(id=clinic_id).first()
        if not clinic:
            raise ValidtionError('Clinic not found')
        doctor = Doctor.objects(clinic=clinic, field=field).first()
        if not doctor:
            raise ValidtionError('Doctor not found')
        patient = Patient.objects(username=patient_username).first()
        session = Session.objects.create(topic=topic, patient=patient, doctor=doctor)
        message = Message(msg=description, sender='P', time=datetime.datetime.now())
        session.messages.append(message)
        session.save()
        doctor_ = { 'id': str(doctor.id), 'name': doctor.username, 'field': doctor.field }
        clinic_ = { 'id': str(clinic.id), 'name': clinic.name }
        session_ = { 'id': str(session.id), 'topic': session.topic, 'description': session.messages[0].msg}
    except ValidationError as e:
        return JsonResponse({ 'error_message': e.args[0] })
    else:
        return JsonResponse({
            'clinic': clinic_,
            'doctor': doctor_,
            'session': session_ })

@csrf_exempt
def get_session(request):
    body = json.loads(request.body.decode("utf-8"))
    try:
        session_id = body['session_id']
        session = Session.objects(id=session_id).first()
        if not session:
            raise ValidationError("Session not found.")
        session_ = {
            'id': str(session.id),
            'topic': session.topic,
            'patient': {
                'id': str(session.patient.id),
                'name': session.patient.username
            },
            'doctor': {
                'id': str(session.doctor.id),
                'name': session.doctor.username
            },
        }
        messages = [{ 'msg': msg.msg, 'sender': msg.sender, 'time': format_date(msg.time)  } for msg in session.messages]
        session_['messages'] = messages
    except ValidationError as e:
        return JsonResponse({ 'error_message': e.args[0] })
    return JsonResponse({'session': session_ })
        
@csrf_exempt
def create_transcript(request):
    body = json.loads(request.body.decode("utf-8"))
    try:
        doctor = body['doctor']
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
        doctor = body['doctor']
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

@csrf_exempt
def delete_session(request):
    body = json.loads(request.body.decode("utf-8"))
    session_id = body['session_id']
    try:
        session = Session.objects(id=session_id).first()
        if not session:
            raise Exception('Session not found')
        session.delete()
    except Exception as e:
        return JsonResponse({ 'error_message': e.args[0] })
    return JsonResponse({})

@csrf_exempt
def send_message(request):
    body = json.loads(request.body.decode("utf-8"))
    try:
        message = Message(msg=body['msg'], time=datetime.datetime.now(), sender=body['sender'])
        session = Session.objects(id=body['session_id']).first()
        if not session:
            raise Exception('Session not found')
        session.messages.append(message)
        session.save()
        messages = [ { 'msg': msg.msg, 'sender': msg.sender, 'time': format_date(msg.time) } for msg in session.messages ]
    except Exception as e:
        return JsonResponse({ 'error_message': e.args[0] })
    return JsonResponse({ 'messages': messages })
