from mongoengine import *
from . import Doctor, Patient

class Message(EmbeddedDocument):
    msg = StringField(max_length=100)
    sender = StringField(required=True,max_length=1)
    time = DateTimeField()

class Clinic(Document):
    clinic_name = StringField(required = True, max_length=50)
    clinic_description = StringField(max_length=100)
    clinic_contrib = ListField(ReferenceField(Doctor))
	
class Session(Document):
    topic = StringField(max_length=50)
    patient = ReferenceField(Patient)
    doctor = ReferenceField(Doctor)
    messages = ListField(EmbeddedDocumentField(Message))

class Appointment(Document):
    doctor = ReferenceField(Doctor)
    patient = ReferenceField(Patient)
    time = DateTimeField()
    note = StringField(max_length=100)

class Drug(EmbeddedDocument):
    name = StringField(max_length=50)
    amount = IntField()
    usage = StringField(max_length=100)
	
class Transcript(Document):
    doctor = ReferenceField(Doctor)
    patient = ReferenceField(Patient)
    drugs = ListField(EmbeddedDocumentField(Drug))
    note = StringField(max_length = 100)
