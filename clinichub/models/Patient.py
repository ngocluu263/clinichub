from mongoengine import *
from .User import *
import datetime
        
class Patient(User):
    balance = FloatField()
    phone_no = StringField(max_length=20)
    address = StringField(max_length=100)
    allergy = StringField(max_length=200)

    @classmethod
    def register(cls, request):
        try:
            username = request.POST.get('username', '')
            password = request.POST.get('password', '')
            password_confirm = request.POST.get('password_confirm', '')
            email = request.POST.get('email', '')
            firstname = request.POST.get('firstname', '')
            lastname = request.POST.get('lastname', '')
            birthdate = request.POST.get('birthdate', '')
            id_no = request.POST.get('id_no', '')
            phone_no = request.POST.get('phone_no', '')
            address = request.POST.get('address', '')
            allergy = request.POST.get('allergy', '')
            img_url = request.POST.get('img_url', '') or '/static/user/default-user.jpg'

            if (password != password_confirm):
                raise ValidationError('PasswordNotMatched')

            user = cls.create_user(username, password)
            user.email = email
            user.firstname = firstname
            user.lastname = lastname
            user.balance = 0
            user.birthdate = datetime.datetime.strptime(birthdate, '%Y-%M-%d')
            user.id_no = id_no
            user.phone_no = phone_no
            user.address = address
            user.allergy = allergy
            user.img_url = img_url
            
            user.save()
        except ValidationError:
            raise
        except NotUniqueError:
            raise
