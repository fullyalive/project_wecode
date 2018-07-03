from rest_framework import serializers
from . import models
from wecode.users import models as user_models

class LectureSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Lecture
        fields = '__all__'

class FeedUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = user_models.User
        fields = (
            'id', 
            'username'
            )


class LikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.LectureLike
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):

    creator = FeedUserSerializer(read_only=True)

    class Meta:
        model = models.LectureComment
        fields = (
            'id',
            'message',
            'creator'
        )
