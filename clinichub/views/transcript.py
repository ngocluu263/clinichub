from django.shortcuts import render
from django.http import HttpResponse

def transcript(request, transcript_id):
    if 'username' in request.session and request.session.get('user_type') == 'patient':
        return render(request, 'transcript/transcript.html')
    else:
        return redirect(reverse('index'))

def transcript_create(request):
    if 'username' in request.session and request.session.get('user_type') == 'patient':
        return render(request, 'transcript/create.html')
    else:
        return redirect(reverse('index'))
