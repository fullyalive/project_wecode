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
        )


class CommentSerializer(serializers.ModelSerializer):

    creator = FeedUserSerializer(read_only=True)

    class Meta:
        model = models.StudyComment
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
        model = models.StudyLike
        fields = '__all__'


class StudySerializer(serializers.ModelSerializer):

    creator = FeedUserSerializer(read_only=True)
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = models.StudyGroup
        fields = ('id', 'description', 'short_description', 'location', 'creator',
                  'studyImage', 'title', 'updated_at',
                  'natural_time', 'is_liked', 'like_count',
                  'comma_price', 'start_date', 'end_date', 'start_time', 'end_time', 'day1', 'day2',
                   'url', 'career1', 'career2', 'contents', 'curriculum1', 'curriculum2', 'deadline_date', 'deadline'
                  )
    
    def get_is_liked(self, obj):

        if 'request' in self.context:
            request = self.context['request']
            queryset = obj.study_likes.all()
            for data in queryset:
                if data.creator.id==request.user.id:
                    return True
            return False      
        return False


class StudyDetailSerializer(serializers.ModelSerializer):

    creator = FeedUserSerializer(read_only=True)
    study_comments = CommentSerializer(read_only=True, many=True)
    is_liked = serializers.SerializerMethodField()
    attend_users = FeedUserSerializer(read_only=True, many=True)
    wish_users = FeedUserSerializer(read_only=True, many=True)

    class Meta:
        model = models.StudyGroup
        fields = ('id', 'description', 'short_description', 'location', 'creator',
                  'studyImage', 'title', 'updated_at', 'study_comments',
                  'natural_time', 'is_liked', 'like_count',
                  'comma_price', 'start_date', 'end_date', 'start_time', 'end_time', 'day1', 'day2',
                  'attend_users', 'wish_users','url',
                  'career1', 'career2', 'contents', 'curriculum1', 'curriculum2', 'deadline_date', 'deadline'
                  )

    def get_is_liked(self, obj):

        if 'request' in self.context:
            request = self.context['request']
            queryset = obj.study_likes.all()
            for data in queryset:
                if data.creator.id == request.user.id:
                    return True
            return False
        return False


class UserUseStudySerializer(serializers.ModelSerializer):

    creator = FeedUserSerializer(read_only=True)

    class Meta:
        model = models.StudyGroup
        fields = ('id', 'description', 'short_description', 'location', 'creator',
                  'studyImage', 'title', 'updated_at', 'natural_time', 'attendants',
                  'comma_price', 'start_date', 'end_date', 'start_time', 'end_time', 'day1', 'day2', 'deadline', 'deadline_date')
