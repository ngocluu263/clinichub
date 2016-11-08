from rest_framework_mongoengine import viewsets
from .serializers import *
from clinichub.models import *

class ClinicViewSet(viewsets.ModelViewSet):
    queryset = Clinic.objects.all()
    serializer_class = ClinicSerializer