from rest_framework import serializers
from . import models
from wecode.users import models as user_models


class FeedUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = user_models.User
        fields = (
            'id',
            'username',
            'profile_image'
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


class LikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.StudyLike
        fields = '__all__'


class StudySerializer(serializers.ModelSerializer):

    creator = FeedUserSerializer(read_only=True)
    study_comments = CommentSerializer(read_only=True, many=True)
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = models.StudyGroups
        fields = ('id', 'description', 'short_description', 'location', 'creator',
                  'studyImage', 'title', 'updated_at', 'study_comments', 'natural_time', 'is_liked', 'like_count')

    def get_is_liked(self, obj):
        if 'request' in self.context:
            request = self.context['request']
            try:
                models.StudyLike.objects.get(creator__id=request.user.id, study__id=obj.id)
                return True
            except models.StudyLike.DoesNotExist:
                return False
        return False
