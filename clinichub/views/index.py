from django.shortcuts import render

def index(request):
    print(request.session.get('username'))
    return render(request, 'index.html', {
        'username': request.session.get('username')    
    })
