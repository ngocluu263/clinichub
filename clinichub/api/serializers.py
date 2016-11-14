from clinichub.models import *
from rest_framework.serializers import *
from rest_framework_mongoengine.serializers import *
from rest_framework.exceptions import *

class ClinicSerializer(DocumentSerializer):
    name = CharField(max_length=50)
    description = CharField(max_length=100, allow_blank=True)
    price = FloatField(min_value=0)

    class Meta:
        model = Clinic
        fields = ('id', 'name', 'description', 'price', 'fields')

class PatientSerializer(DocumentSerializer):
    fullname = ReadOnlyField()
    class Meta:
        model = Patient
        fields = ('id', 'username', 'email', 'firstname', 'lastname', 'fullname', 'birthdate', 'id_no', 'balance', 'phone_no', 'address', 'allergy')

class DoctorSerializer(DocumentSerializer):
    fullname = ReadOnlyField()
    clinic = ClinicSerializer()
    class Meta:
        model = Doctor
        fields = ('id', 'username', 'email', 'firstname', 'lastname', 'fullname', 'birthdate', 'id_no', 'field', 'clinic', 'md_no', 'activate')

class MessageSerializer(EmbeddedDocumentSerializer):
    class Meta:
        model = Message
        fields = ('msg', 'sender', 'time')

class DoctorPrimaryKeyRelatedField(PrimaryKeyRelatedField):
    def to_internal_value(self, data):
        doctor = Doctor.objects(id=data).first()
        if not doctor:
            raise NotFound()
        return doctor

    def to_representation(self, obj):
        serializer = DoctorSerializer(obj)
        return serializer.data

class PatientPrimaryKeyRelatedField(PrimaryKeyRelatedField):
    def to_internal_value(self, data):
        patient = Patient.objects(id=data).first()
        if not patient:
            raise NotFound()
        return patient

    def to_representation(self, obj):
        serializer = PatientSerializer(obj)
        return serializer.data

class SessionSerializer(DocumentSerializer):
    doctor = DoctorPrimaryKeyRelatedField(queryset=Doctor.objects)
    patient = PatientPrimaryKeyRelatedField(queryset=Patient.objects)
    messages = ListField(child=MessageSerializer())

    class Meta:
        model = Session
        fields = ('id', 'topic', 'doctor', 'patient', 'messages')