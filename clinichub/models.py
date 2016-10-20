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

class Doctor(User):
    field = StringField(max_length=30)
