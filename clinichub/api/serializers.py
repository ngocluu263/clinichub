from clinichub.models import *
from rest_framework.serializers import *
from rest_framework_mongoengine.serializers import *

class ClinicSerializer(DocumentSerializer):
    name = CharField(max_length=50)
    description = CharField(max_length=100, allow_blank=True)
    price = FloatField(min_value=0)

    class Meta:
        model = Clinic
        fields = ('id', 'name', 'description', 'price')