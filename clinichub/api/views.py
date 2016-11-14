from rest_framework_mongoengine import viewsets
from rest_framework.response import Response 
from rest_framework.decorators import detail_route, list_route
from .serializers import *
from clinichub.models import *
import datetime

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

    def create(self, request):
        data = request.data
        data['messages'] = [
            { 
                'msg': data['description'],
                'sender': 'P',
                'time': datetime.datetime.now()
            }
        ]
        data.pop('description', None)
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @detail_route(methods=['post'])
    def push_message(self, request, id):
        try:
            obj = self.get_object()
            data = request.data
            data['time'] = datetime.datetime.now()
            message = Message(msg=data['msg'], sender=data['sender'], time=data['time'])
            obj.messages.append(message)
            obj.save()
        except Exception as e:
            return Response({
                'error': e.args[0]
            })
        return Response({
            'msg': message.msg,
            'sender': message.sender,
            'time': message.time.isoformat()
        })

class ClinicViewSet(viewsets.ModelViewSet):
    queryset = Clinic.objects.all()
    serializer_class = ClinicSerializer