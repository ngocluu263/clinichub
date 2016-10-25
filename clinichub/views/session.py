from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.core.urlresolvers import reverse

def session(request, session_id):
    if 'username' in request.session and request.session.get('user_type') == 'patient':
        return render(request, 'session/session.html')
    else:
        return redirect(reverse('index'))

def session_create(request):
    if 'username' in request.session and request.session.get('user_type') == 'patient':
        return render(request, 'session/create.html')
    else:
        return redirect(reverse('index'))
