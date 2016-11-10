from clinichub.models import *
from rest_framework.serializers import *
from rest_framework_mongoengine.serializers import *

class PatientSerializer(DocumentSerializer):
    fullname = ReadOnlyField()
    class Meta:
        model = Patient
        fields = ('id', 'username', 'email', 'firstname', 'lastname', 'fullname', 'birthdate', 'id_no', 'balance', 'phone_no', 'address', 'allergy')

class DoctorSerializer(DocumentSerializer):
    fullname = ReadOnlyField()
    class Meta:
        model = Doctor
        fields = ('id', 'username', 'email', 'firstname', 'lastname', 'fullname', 'birthdate', 'id_no', 'field', 'clinic', 'md_no', 'activate')

class MessageSerializer(EmbeddedDocumentSerializer):
    class Meta:
        model = Message
        fields = ('msg', 'sender', 'time')

class SessionSerializer(DocumentSerializer):
    doctor = DoctorSerializer()
    patient = PatientSerializer()
    messages = ListField(child=MessageSerializer())
    class Meta:
        model = Session
        fields = ('id', 'topic', 'doctor', 'patient', 'messages')

class ClinicSerializer(DocumentSerializer):
    name = CharField(max_length=50)
    description = CharField(max_length=100, allow_blank=True)
    price = FloatField(min_value=0)

    class Meta:
        model = Clinic
        fields = ('id', 'name', 'description', 'price')