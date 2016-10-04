from django.db import models
from mongoengine import *

class User(Document):
    username = StringField(required=True, max_length=20)
    firstname = StringField(max_length=50)
    lastname = StringField(max_length=50)
