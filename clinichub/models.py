from django.db import models
from mongoengine import *


class User(Document):
    username = StringField(required=True, max_length=20)
    firstname = StringField(required=True,max_length=50)
    lastname = StringField(required=True,max_length=50)

class Clinic(Document):
	clinic_name = StringField(required = True, max_length=50)
	clinic_descliption = StringField(max_length=100)

class Session(Document):
	topic = StringField(max_length=50)
	ses_patient = int
	ses_doctor = int

class Appointments(Document):
	app_doctor = int
	app_patient = int
	app_time = models.DateField() 
	app_note = StringField(max_length=100)

class Transcript(Document):
	trans_doctor = int
	trans_patient = int
	trans_note = StringField(max_length = 100)

class Message(Document):
	msg = StringField(max_length=100)
	sender = StringField(max_length=1)

class Drug(Document):
	drug_name = StringField(max_length=50)
	drug_amount = int
	drug_usage = StringField(max_length=100)


