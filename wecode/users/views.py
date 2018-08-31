from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.generics import CreateAPIView, UpdateAPIView
from django.contrib.auth import get_user_model  # If used custom user model
from . import models, serializers
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLoginView


class CreateUserView(CreateAPIView):

    model = get_user_model()
    permission_classes = [
        permissions.AllowAny  # Or anon users can't register
    ]
    serializer_class = serializers.BasicUserSerializer


class ChangePassword(APIView):

    def put(self, request, username, format=None):

        user = request.user

        if user.username == username:

            current_password = request.data.get('current_password', None)

            if current_password is not None:

                passwords_match = user.check_password(current_password)

                if passwords_match:

                    new_password = request.data.get('new_password', None)

                    if new_password is not None:

                        user.set_password(new_password)

                        user.save()

                        return Response(status=status.HTTP_200_OK)

                    else:

                        return Response(status=status.HTTP_400_BAD_REQUEST)

                else:

                    return Response(status=status.HTTP_400_BAD_REQUEST)

            else:

                return Response(status=status.HTTP_400_BAD_REQUEST)

        else:

            return Response(status=status.HTTP_400_BAD_REQUEST)


class UpdateUserView(APIView):

    def post(self, request, format=None):

        user = request.user
        user_serializer = serializers.UserSerializer(user)
        serializer = serializers.UserSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():

            serializer.save(partial=True)

            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        else:

            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter


class ProfileView(APIView):

    def get(self, request, format=None):

        user = request.user
        serializer = serializers.UserSerializer(user)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        user = request.user
        user_serializer = serializers.UserSerializer(user)
        serializer = serializers.UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(partial=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
