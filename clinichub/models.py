from django.db import models
from mongoengine import *
from mongoengine.django.auth import User

class User(User):
    firstname = StringField(max_length=50)
    lastname = StringField(max_length=50)

    @classmethod
    def login(cls, request):
        username = request.POST.get('username', '')
        password = request.POST.get('password', '')
        user = cls.objects(username=username).first()
        if user and user.check_password(password):
            request.session['username'] = username
            return {}
        else:
            return {'error_message': "Wrong username or password"}

    @classmethod
    def logout(cls, request):
        request.session.pop('username')
        
class Patient(User):
    balance = FloatField()

    @classmethod
    def register(cls, request):
        try:
            username = request.POST.get('username', '')
            password = request.POST.get('password', '')
            password_confirm = request.POST.get('password_confirm', '')
            email = request.POST.get('email', '')
            firstname = request.POST.get('firstname', '')
            lastname = request.POST.get('lastname', '')

            if (password != password_confirm):
                raise ValidationError('PasswordNotMatched')

            user = cls.create_user(username, password)
            user.email = email
            user.firstname = firstname
            user.lastname = lastname
            user.balance = 0
            user.save()
        except ValidationError:
            raise
        except NotUniqueError:
            raise

class Doctor(User):
    field = StringField(max_length=30)
    clinic = ReferenceField('Clinic')

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
