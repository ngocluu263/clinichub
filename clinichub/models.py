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
