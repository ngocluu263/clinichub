from rest_framework_mongoengine import viewsets
from .serializers import *
from clinichub.models import *

class PatientViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

class DoctorViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

class SessionViewSet(viewsets.ModelViewSet):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer

class ClinicViewSet(viewsets.ModelViewSet):
    queryset = Clinic.objects.all()
    serializer_class = ClinicSerializer