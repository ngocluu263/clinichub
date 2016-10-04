from django.shortcuts import render
from .models import User

def index(request):
    user = User.objects.create(
        username = "somebody"
    )
    user.save()
    return render(request, 'index.html')
