from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.core.urlresolvers import reverse
from clinichub.models import *

def session(request, session_id):
    if 'username' in request.session:
        try:
            session = Session.objects(id=session_id).first()
            if not session:
                raise Exception('Session not found.')
            username = request.session.get('username')
            user_type = request.session.get('user_type')
            if user_type == 'patient':
                user = Patient.objects(username=username).first()
            else:
                user = Doctor.objects(username=username).first()
            if user == session.patient or user == session.doctor:
                return render(request, 'session/session.html')
            else:
                raise Exception('You do not have a permission to view this session.')
        except Exception as e:
            return render(request, 'session/session.html', {
                'error_message': e.args[0]   
            })
    else:
        return redirect(reverse('index'))

def session_create(request):
    if 'username' in request.session and request.session.get('user_type') == 'patient':
        return render(request, 'session/create.html')
    else:
        return redirect(reverse('index'))
