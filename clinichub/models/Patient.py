from mongoengine import *
from .User import *
        
class Patient(User):
    balance = FloatField()

    @classmethod
    def register(cls, request):
        try:
            username = request.POST.get('username', '')
            password = request.POST.get('password', '')
            password_confirm = request.POST.get('password_confirm', '')
            email = request.POST.get('email', '')
            firstname = request.POST.get('firstname', '')
            lastname = request.POST.get('lastname', '')

            if (password != password_confirm):
                raise ValidationError('PasswordNotMatched')

            user = cls.create_user(username, password)
            user.email = email
            user.firstname = firstname
            user.lastname = lastname
            user.balance = 0
            user.save()
        except ValidationError:
            raise
        except NotUniqueError:
            raise
