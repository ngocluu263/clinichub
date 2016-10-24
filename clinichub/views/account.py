from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.core.urlresolvers import reverse
from clinichub.models import *

def login(request):
    if request.method == 'POST':
        result = Patient.login(request)
        if 'error_message' not in result:
            request.session['username'] = result['user'].username
            request.session['user_type'] = 'patient'
            return redirect('/profile')
        else:
            return render(request, 'account/login.html', {
                'error_message': result['error_message']
            })
    else:
        if 'username' not in request.session:
            return render(request, 'account/login.html')
        else:
            return redirect('/profile')

def register(request):
    if request.method == 'POST':
        try:
            result = Patient.register(request)
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
            result = Patient.login(request)
            request.session['username'] = result['user'].username
            request.session['user_type'] = 'patient'
            return redirect('/profile')
    else:
        if 'username' not in request.session:
            return render(request, 'account/register.html')
        else:
            return redirect('/profile')

def logout(request):
    request.session.pop('username')
    request.session.pop('user_type')
    return redirect('/')

def doctor_login(request):
    if request.method == 'POST':
        result = Doctor.login(request)
        if 'error_message' not in result:
            request.session['username'] = result['user'].username
            request.session['user_type'] = 'doctor'
            return redirect('/doctor/profile')
        else:
            return render(request, 'account/login_doctor.html', {
                'error_message': result['error_message']
            })
    else:
        if 'username' not in request.session:
            return render(request, 'account/login_doctor.html')
        else:
            return redirect('/doctor/profile')

def doctor_register(request):
    return HttpResponse('Doctor_register')

def doctor_profile(request):
    return HttpResponse('Doctor_profile')
