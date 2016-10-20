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
        return render(request, 'account/login.html')

def register(request):
    if request.method == 'POST':
        try:
            username = request.POST.get('username', '')
            password = request.POST.get('password', '')
            password_confirm = request.POST.get('password_confirm', '')
            email = request.POST.get('email', '')
            firstname = request.POST.get('firstname', '')
            lastname = request.POST.get('lastname', '')
            if (password != password_confirm):
                raise ValidationError('Password and confirm password must be same.')
            user = Patient.create_user(username, password)
            user.balance = 0
            user.save()
        except ValidationError as e:
            return render(request, 'account/register.html', {
                'error_message': e.args[0]
            })
        except NotUniqueError as e:
            return render(request, 'account/register.html', {
                'error_message': "Username must be unique."
            })
        else:
            return redirect('/')
    else:
        return render(request, 'account/register.html')

def profile(request):
    return render(request, 'account/profile.html', {
        'username': request.session.get('username')
    })

def logout(request):
    User.logout(request)
    return redirect('/')
