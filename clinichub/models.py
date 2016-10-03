from django.db import models
from mongoengine import *

class Employee(Document):
    email = StringField(required=True)
    first_name = StringField(max_length=50)
    last_name = StringField(max_length=50)
