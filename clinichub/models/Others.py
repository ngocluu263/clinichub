from mongoengine import *
from . import Doctor, Patient

class Message(EmbeddedDocument):
    msg = StringField(max_length=100)
    sender = StringField(required=True,max_length=1)
    timestamp = DateTimeField()

class Clinic(Document):
    clinic_name = StringField(required = True, max_length=50)
    clinic_description = StringField(max_length=100)
    clinic_contrib = ListField(ReferenceField(Doctor))
	
class Session(Document):
    topic = StringField(max_length=50)
    ses_patient = ReferenceField(Patient)
    ses_doctor = ReferenceField(Doctor)
    message = ListField(EmbeddedDocumentField(Message))

class Appointments(Document):
    app_doctor = ReferenceField(Doctor)
    app_patient = ReferenceField(Patient)
    app_time = DateTimeField()
    app_note = StringField(max_length=100)

class Drug(EmbeddedDocument):
    name = StringField(max_length=50)
    amount = IntField()
    usage = StringField(max_length=100)
	
class Transcript(Document):
    doctor = ReferenceField(Doctor)
    patient = ReferenceField(Patient)
    drugs = ListField(EmbeddedDocumentField(Drug))
    note = StringField(max_length = 100)
