from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.core.urlresolvers import reverse
from clinichub.models import *

def index(request):
    return render(request, 'index.html')

def login(request):
    if request.method == 'POST':
        login_result = Patient.login(request)
        if 'error_message' not in login_result:
            return redirect('/profile')
        else:
            return render(request, 'account/login.html', {
                'error_message': login_result['error_message']
            })
    else:
        if 'username' not in request.session:
            return render(request, 'account/login.html')
        else:
            return redirect('/profile')

def register(request):
    if request.method == 'POST':
        try:
            register_result = Patient.register(request)
        except ValidationError as e:
            if e.args[0] == 'PasswordNotMatched':
                return render(request, 'account/register.html', {
                    'error_message': 'Password and confirm password must be same.'
                })
        except NotUniqueError as e:
            return render(request, 'account/register.html', {
                'error_message': "Username must be unique."
            })
        else:
            login_result = Patient.login(request)
            return redirect('/profile')
    else:
        if 'username' not in request.session:
            return render(request, 'account/register.html')
        else:
            return redirect('/profile')

def profile(request):
    return render(request, 'account/profile.html', {
        'username': request.session.get('username')
    })

def logout(request):
    User.logout(request)
    return redirect('/')
