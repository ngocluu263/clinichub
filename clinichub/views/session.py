from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.core.urlresolvers import reverse
from clinichub.models import *

def session(request, session_id):
    if 'username' in request.session:
        session = Session.objects(id=session_id).first()
        username = request.session.get('username')
        user_type = request.session.get('user_type')
        if user_type == 'patient':
            user = Patient.objects(username=username).first()
        else:
            user = Doctor.objects(username=username).first()
        if user == session.patient or user == session.doctor:
            return render(request, 'session/session.html')
        else:
            return render(request, 'session/session.html', {
                'error_message': 'You do not have a permission to view this session.'     
            })
    else:
        return redirect(reverse('index'))

def session_create(request):
    if 'username' in request.session and request.session.get('user_type') == 'patient':
        return render(request, 'session/create.html')
    else:
        return redirect(reverse('index'))
