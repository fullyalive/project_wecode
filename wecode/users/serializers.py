from rest_framework import serializers
from . import models
from wecode.lectures import serializers as lectures_serializers
from django.contrib.auth import get_user_model  # If used custom user model


class FeedUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.User
        fields = ('username')

class UserSerializer(serializers.ModelSerializer):


    lectures = lectures_serializers.LectureSerializer(many=True, read_only=True)
    post_count = serializers.ReadOnlyField()

    
    class Meta:
        model = models.User
        fields = '__all__'


class BasicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ('id', 'username', 'password', 'email')
        write_only_fields = ('password',)
        read_only_fields = ('id',)

    def create(self, validated_data):
        user = models.User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()

        return user
    
    
