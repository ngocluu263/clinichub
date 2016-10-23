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
    drug_name = StringField(max_length=50)
    drug_amount = IntField()
    drug_usage = StringField(max_length=100)
	
class Transcript(Document):
    trans_doctor = ReferenceField(Doctor)
    trans_patient = ReferenceField(Patient)
    trans_drugs = ListField(EmbeddedDocumentField(Drug))
    trans_note = StringField(max_length = 100)
