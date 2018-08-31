from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views.generic import View
from django.http import HttpResponse
from django.conf import settings
from django.shortcuts import get_object_or_404
from django.core.mail import send_mail
from wecode.users.serializers import PasswordResetSerializer
from wecode.users.models import User
import uuid


class ReactAppView(View):

    def get(self, request):
        try:
            with open(os.path.join(str(settings.ROOT_DIR), 'frontend', 'build', 'index.html')) as file:
                return HttpResponse(file.read())
        except:
            return HttpResponse(
                """
                index.html not found ! build your React app !!
                """,
                status=501,
            )


class passwordReset(APIView):

    def post(self, request, *args, **kwargs):
        serializer = PasswordResetSerializer(data=request.data)
        email = request.data['email']
        user = get_object_or_404(User, email=email)
        username = user.username
        temp = uuid.uuid4().hex[:10]
        subject = '[WECODE] 임시 비밀번호 발급입니다.'
        message = '임시비밀 번호는 {} 입니다. \n {}로 로그인 한 뒤 비밀번호를 수정해주세요\n\n 아이디는 {} 입니다.'.format(temp,temp,username)
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [email, ]
        print(subject)
        print(message)
        print(email_from)
        print(recipient_list)
        user.set_password(temp)
        user.save()
        send_mail(subject,message, email_from, recipient_list)
        return Response(status=status.HTTP_200_OK)
