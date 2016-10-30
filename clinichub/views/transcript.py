from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.core.urlresolvers import reverse
from clinichub.models import *

def transcript(request, transcript_id):
    if 'username' in request.session:
        try:
            transcript = Transcript.objects(id=transcript_id).first() 
            if not transcript:
                raise Exception('Transcript not found.')
            username = request.session.get('username')
            user_type = request.session.get('user_type')
            if user_type == 'patient':
                user = Patient.objects(username=username).first()
            else:
                user = Doctor.objects(username=username).first()
            if user == transcript.patient or user == transcript.doctor:
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
                raise Exception('You do not have a permission to view this transcript.')
        except Exception as e:
            return render(request, 'transcript/transcript.html', {
                'error_message': e.args[0]   
            })
        return render(request, 'transcript/transcript.html', {
            'transcript': transcript_    
        })
    else:
        return redirect(reverse('index'))
