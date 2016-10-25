from django.shortcuts import render
from django.http import HttpResponse

def appointment(request, appointment_id):
    if 'username' in request.session:
        return render(request, 'appointment/appointment.html')
    else:
        return redirect(reverse('index'))

def appointment_create(request):
    if 'username' in request.session:
        return render(request, 'appointment/create.html')
    else:
        return redirect(reverse('index'))
