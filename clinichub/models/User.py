from mongoengine import *
from mongoengine.django.auth import User

class User(User):
    firstname = StringField(max_length=50)
    lastname = StringField(max_length=50)
    birthdate = DateTimeField()
    id_no = StringField(max_length=20)
    img_url = StringField(max_length=100)

    @property
    def fullname(self):
        return str(self.firstname) + " " + str(self.lastname)

    @classmethod
    def login(cls, request):
        username = request.POST.get('username', '')
        password = request.POST.get('password', '')
        user = cls.objects(username=username).first()
        if user and user.check_password(password):
            return { 'user': user }
        else:
            return {'error_message': "Wrong username or password"}
