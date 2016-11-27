from mongoengine import *
from .User import *

class Doctor(User):
    field = StringField(max_length=30)
    clinic = ReferenceField('Clinic')
    md_no = StringField(max_length=20)
    activate = BooleanField()

    @classmethod
    def login(cls, request):
        username = request.POST.get('username', '')
        password = request.POST.get('password', '')
        user = cls.objects(username=username).first()
        if user and user.check_password(password):
            if user.activate:
                return { 'user': user }
            else:
                return {'error_message': "Your account is not activated."}
        else:
            return {'error_message': "Wrong username or password"}

    @classmethod
    def register(cls, request):
        try:
            username = request.POST.get('username', '')
            password = request.POST.get('password', '')
            password_confirm = request.POST.get('password_confirm', '')
            email = request.POST.get('email', '')
            firstname = request.POST.get('firstname', '')
            lastname = request.POST.get('lastname', '')
            id_no = request.POST.get('id_no', '')
            field = request.POST.get('field', '')
            md_no = request.POST.get('md_no', '')
            img_url = request.POST.get('img_url', '/static/user/default-user.jpg')
        
            if (password != password_confirm):
                raise ValidationError('PasswordNotMatched')

            user = cls.create_user(username, password, email)
            user.firstname = firstname
            user.lastname = lastname
            user.id_no = id_no
            user.field = field
            user.md_no = md_no
            user.img_url = img_url

            user.activate = False
            
            user.save()
        except ValidationError:
            raise
        except NotUniqueError:
            raise
