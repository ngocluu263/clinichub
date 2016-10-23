from mongoengine import *
from .User import *

class Doctor(User):
    field = StringField(max_length=30)
    clinic = ReferenceField('Clinic')
