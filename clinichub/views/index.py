from django.shortcuts import render

def index(request):
    return render(request, 'index.html', {
        'username': request.session.get('username')    
    })

def doctor_index(request):
    return render(request, 'index_doctor.html', {
        'username': request.session.get('username')    
    })
