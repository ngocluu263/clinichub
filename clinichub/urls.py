from django.conf.urls import url, include
from django.core.urlresolvers import reverse
from . import views

patient_urlpatterns = [
    url(r'^$', views.patient_profile, name='patient_profile'),
    url(r'^sessions$', views.patient_sessions, name='patient_sessions'),
    url(r'^info$', views.patient_info, name='patient_info'),
    url(r'^payment$', views.patient_payment, name='patient_payment'),
    url(r'^appointments$', views.patient_appointments, name='patient_appointments'),
    url(r'^transcripts$', views.patient_transcripts, name='patient_transcripts'),
]

doctor_urlpatterns = [
    url(r'^$', views.doctor_profile, name='doctor_profile'),
    url(r'^sessions$', views.doctor_sessions, name='doctor_sessions'),
    url(r'^info$', views.doctor_info, name='doctor_info'),
    url(r'^clinic$', views.doctor_clinic, name='doctor_clinic'),
    url(r'^appointments$', views.doctor_appointments, name='doctor_appointments'),
]

session_urlpatterns = [
    url(r'^create$', views.session_create, name='session_create'),
    url(r'^(?P<session_id>[a-f0-9]{24})$', views.session, name='session'),
]

transcript_urlpatterns = [
    url(r'^(?P<transcript_id>[a-f0-9]{24})$', views.transcript, name='transcript'),
]

appointment_urlpatterns = [
    url(r'^(?P<appointment_id>[a-f0-9]{24})$', views.appointment, name='appointment'),
]

api_urlpatterns = [
    url(r'^get_all_clinics$', views.api.get_all_clinics),
    url(r'^create_session$', views.api.create_session),
    url(r'^get_session$', views.api.get_session),
    url(r'^create_transcript$', views.api.create_transcript),
    url(r'^create_appointment$', views.api.create_appointment),
    url(r'^delete_session$', views.api.delete_session),
    url(r'^send_message$', views.api.send_message),
]

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^login$', views.login, name='login'),
    url(r'^register$', views.register, name='register'),
    url(r'^logout$', views.logout, name='logout'),
    url(r'^profile/', include(patient_urlpatterns)),
    url(r'^doctor$', views.doctor_index, name='doctor_index'),
    url(r'^doctor/login$', views.doctor_login, name='doctor_login'),
    url(r'^doctor/register$', views.doctor_register, name='doctor_register'),
    url(r'^doctor/profile/', include(doctor_urlpatterns)),
    url(r'^session/', include(session_urlpatterns)),
    url(r'^transcript/', include(transcript_urlpatterns)),
    url(r'^appointment/', include(appointment_urlpatterns)),
    url(r'^api/', include(api_urlpatterns)),
]
