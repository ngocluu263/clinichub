from django.shortcuts import render
from django.http import HttpResponse

def transcript(request, transcript_id):
    return HttpResponse('transcript '+ transcript_id)

def transcript_create(request):
    return HttpResponse('transcript_create')
