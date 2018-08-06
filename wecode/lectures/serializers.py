from rest_framework import serializers
from . import models
from wecode.users import models as user_models


class FeedUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = user_models.User
        fields = (
            'id',
            'username',
            'profile_image',
            'bio'
        )


class CommentSerializer(serializers.ModelSerializer):

    creator = FeedUserSerializer(read_only=True)

    class Meta:
        model = models.LectureComment
        fields = (
            'id',
            'message',
            'creator',
            'created_time_mdhm',
            'parent'
        )


class LikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.LectureLike
        fields = '__all__'


class LectureSerializer(serializers.ModelSerializer):

    creator = FeedUserSerializer(read_only=True)
    lecture_comments = CommentSerializer(read_only=True, many=True)
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = models.Lecture
        fields = ('id', 'description', 'short_description', 'location', 'creator',
                  'lectureImage', 'title', 'updated_at', 'lecture_comments', 
                  'natural_time', 'is_liked', 'like_count', 
                  'comma_price', 'start_date', 'end_date', 'start_time', 'end_time', 'day1', 'day2')

    def get_is_liked(self, obj):
        if 'request' in self.context:
            request = self.context['request']
            try:
                models.LectureLike.objects.get(creator__id=request.user.id, lecture__id=obj.id)
                return True
            except models.LectureLike.DoesNotExist:
                return False
        return False


class LectureDetailSerializer(serializers.ModelSerializer):

    creator = FeedUserSerializer(read_only=True)
    lecture_comments = CommentSerializer(read_only=True, many=True)
    is_liked = serializers.SerializerMethodField()
    attend_users = FeedUserSerializer(read_only=True, many=True)
    wish_users = FeedUserSerializer(read_only=True, many=True)

    class Meta:
        model = models.Lecture
        fields = ('id', 'description', 'short_description', 'location', 'creator',
                  'lectureImage', 'title', 'updated_at', 'lecture_comments',
                  'natural_time', 'is_liked', 'like_count',
                  'comma_price', 'start_date', 'end_date', 'start_time', 'end_time', 'day1', 'day2',
                  'attend_users', 'wish_users',
                  'career1', 'career2', 'contents', 'curriculum1', 'curriculum2'
                  )

    def get_is_liked(self, obj):
        if 'request' in self.context:
            request = self.context['request']
            try:
                models.LectureLike.objects.get(creator__id=request.user.id, lecture__id=obj.id)
                return True
            except models.LectureLike.DoesNotExist:
                return False
        return False
