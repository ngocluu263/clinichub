from django.conf.urls import url, include
from rest_framework_mongoengine import routers
from . import views

router = routers.SimpleRouter()
router.register(r'patients', views.PatientViewSet)
router.register(r'doctors', views.DoctorViewSet)
router.register(r'clinics', views.ClinicViewSet)
router.register(r'sessions', views.SessionViewSet)
router.register(r'appointments', views.AppointmentViewSet)
router.register(r'transcripts', views.TranscriptViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]