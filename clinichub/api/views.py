from rest_framework_mongoengine import viewsets
from rest_framework.response import Response 
from rest_framework.decorators import detail_route, list_route
from .serializers import *
from clinichub.models import *
import datetime

class PatientViewSet(viewsets.ModelViewSet):
    http_method_names = ['get', 'patch']
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

class DoctorViewSet(viewsets.ModelViewSet):
    http_method_names = ['get', 'patch']
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

    @list_route()
    def noclinic(self, request):
        queryset = self.filter_queryset(list(filter(lambda doctor: doctor.clinic == None and doctor.activate == True, self.get_queryset())))
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

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

        clinic = Clinic.objects(id=data['clinic']).first()
        doctor = Doctor.objects(clinic=clinic, field=data['field']).first()
        data['doctor'] = doctor.id
        patient = Patient.objects(id=data['patient']).first()
        patient.balance = patient.balance - clinic.price
        patient.save()
        
        serializer = self.get_serializer(data=data)
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
    
    def get_queryset(self):
        queryset = self.queryset
        patient = self.request.query_params.get('patient', None)
        doctor = self.request.query_params.get('doctor', None)
        is_short = self.request.query_params.get('short', None)

        if is_short == 'true':
            queryset = queryset.exclude('messages')

        if patient is not None:
            queryset = queryset.filter(patient=patient)

        if doctor is not None:
            queryset = queryset.filter(doctor=doctor)

        return queryset

class ClinicViewSet(viewsets.ModelViewSet):
    queryset = Clinic.objects.all()
    serializer_class = ClinicSerializer

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all().order_by('-time')
    serializer_class = AppointmentSerializer
    
    def get_queryset(self):
        queryset = self.queryset
        patient = self.request.query_params.get('patient', None)
        doctor = self.request.query_params.get('doctor', None)
        session = self.request.query_params.get('session', None)

        if patient is not None:
            queryset = queryset.filter(patient=patient)

        if doctor is not None:
            queryset = queryset.filter(doctor=doctor)
            
        if session is not None:
            queryset = queryset.filter(session=session)

        return queryset

class TranscriptViewSet(viewsets.ModelViewSet):
    queryset = Transcript.objects.all()
    serializer_class = TranscriptSerializer

    def get_queryset(self):
        queryset = self.queryset
        patient = self.request.query_params.get('patient', None)
        doctor = self.request.query_params.get('doctor', None)

        if patient is not None:
            queryset = queryset.filter(patient=patient)

        if doctor is not None:
            queryset = queryset.filter(doctor=doctor)

        return queryset