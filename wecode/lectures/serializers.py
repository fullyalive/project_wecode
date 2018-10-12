from rest_framework import serializers
from . import models
from wecode.users import models as user_models


class FeedUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = user_models.User
        fields = (
            'id',
            'username',
            'name',
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
            'parent',
            'groupNumber',
            'groupOrder',
            'recomment_count',
        )


class LikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.LectureLike
        fields = '__all__'


class LectureSerializer(serializers.ModelSerializer):

    creator = FeedUserSerializer(read_only=True)
    # lecture_comments = CommentSerializer(read_only=True, many=True)
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = models.Lecture
        fields = ('id', 'description', 
        'short_description', 'location', 'creator',
                  'lectureImage', 'title', 'updated_at', 
                # 'lecture_comments',
                  'natural_time', 'is_liked', 'like_count', 'attendants',
                  'comma_price', 'start_date', 'end_date', 'start_time', 'end_time', 'day1', 'day2', 'deadline', 'deadline_date'
                  )

    def get_is_liked(self, obj):
        if 'request' in self.context:
            request = self.context['request']
            queryset = obj.lecture_likes.all()
            for data in queryset:
                if data.creator.id == request.user.id:
                    return True
            return False
        return False

    @staticmethod
    def setup_eager_loading(queryset):
        """ Perform necessary eager loading of data. """
        # select_related for "to-one" relationships
        queryset = queryset.select_related('creator')

        # prefetch_related for "to-many" relationships
        queryset = queryset.prefetch_related(
            'lecture_comments', 'lecture_likes', 'lecture_likes__creator')

        return queryset

class LectureDetailSerializer(serializers.ModelSerializer):

    creator = FeedUserSerializer(read_only=True)
    lecture_comments = CommentSerializer(read_only=True, many=True)
    is_liked = serializers.SerializerMethodField()
    attend_users = FeedUserSerializer(read_only=True, many=True)
    wish_users = FeedUserSerializer(read_only=True, many=True)

    class Meta:
        model = models.Lecture
        fields = ('id', 'description',
                  'short_description', 'location', 'creator',
                  'lectureImage', 'title', 'updated_at', 'lecture_comments',
                  'natural_time', 'is_liked', 'like_count',
                  'comma_price', 'start_date', 'end_date', 'start_time', 'end_time', 'day1', 'day2',
                  'attend_users', 'wish_users',
                  'career1', 'career2', 'contents', 'curriculum1', 'curriculum2', 'attendants', 'url', 'deadline_date', 'deadline'
                  )

    def get_is_liked(self, obj):

        if 'request' in self.context:
            request = self.context['request']
            queryset = obj.lecture_likes.all()
            for data in queryset:
                if data.creator.id == request.user.id:
                    return True
            return False
        return False


class UserUseLectureSerializer(serializers.ModelSerializer):

    creator = FeedUserSerializer(read_only=True)

    class Meta:
        model = models.Lecture
        fields = ('id', 'description', 'short_description', 'location', 'creator',
                  'lectureImage', 'title', 'updated_at', 'natural_time', 'attendants',
                  'comma_price', 'start_date', 'end_date', 'start_time', 'end_time', 'day1', 'day2', 'deadline', 'deadline_date')


class TestSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Lecture
        fields = ('id','description')
