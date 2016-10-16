from django.db import models
from mongoengine.django.auth import User
from mongoengine import *

class Patient(User):
    firstname = StringField(max_length=50)
    lastname = StringField(max_length=50)
    balance = FloatField()

class Doctor(User):
    firstname = StringField(max_length=50)
    lastname = StringField(max_length=50)
    field = StringField(max_length=30)
