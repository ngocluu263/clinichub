from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.core.urlresolvers import reverse
from clinichub.models import *

def transcript(request, transcript_id):
    if 'username' in request.session:
        transcript = Transcript.objects(id=transcript_id).first() 
        transcript_ = {
            'doctor': transcript.doctor.username,
            'patient': transcript.patient.username,
            'note': transcript.note,
            'drugs': transcript.drugs
        }
        return render(request, 'transcript/transcript.html', {
            'transcript': transcript_    
        })
    else:
        return redirect(reverse('index'))
