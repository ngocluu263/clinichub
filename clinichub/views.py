from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.core.urlresolvers import reverse
from .models import *

def index(request):
    return render(request, 'index.html')

def login(request):
    if request.method == 'POST':
        username = request.POST.get('username', '')
        password = request.POST.get('password', '')
        user = Patient.objects(username=username).first()
        if user and user.check_password(password):
            request.session['username'] = username
            return redirect('/profile')
        else:
            return render(request, 'account/login.html', {
                'error_message': "Wrong username or password"    
            })
    else:
        return render(request, 'account/login.html')

def profile(request):
    return render(request, 'account/profile.html', {
        'username': request.session.get('username')
    })

def logout(request):
    request.session.pop('username')
    return redirect('/')
