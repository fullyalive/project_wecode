from rest_framework import serializers
from . import models
from wecode.users import models as user_models

class FeedUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = user_models.User
        fields = (
            'id',
            'username'
        )


class CommentSerializer(serializers.ModelSerializer):

    creator = FeedUserSerializer(read_only=True)

    class Meta:
        model = models.LectureComment
        fields = (
            'id',
            'message',
            'creator'
        )


class LectureSerializer(serializers.ModelSerializer):


    creator = FeedUserSerializer(read_only=True)
    lecture_comments = CommentSerializer(read_only=True, many=True)
    class Meta:
        model = models.Lecture
        fields = ('id', 'description', 'short_description', 'location', 'creator',
                  'lectureImage', 'title', 'updated_at', 'lecture_comments')

class LikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.LectureLike
        fields = '__all__'

