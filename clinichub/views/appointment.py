from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.core.urlresolvers import reverse

def appointment(request, appointment_id):
    if 'username' in request.session:
        return render(request, 'appointment/appointment.html')
    else:
        return redirect(reverse('index'))
