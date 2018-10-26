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
        )


class CommentSerializer(serializers.ModelSerializer):

    creator = FeedUserSerializer(read_only=True)

    class Meta:
        model = models.PostComment
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


class PostSerializer(serializers.ModelSerializer):

    like_count = serializers.ReadOnlyField()
    post_comments = CommentSerializer(read_only=True, many=True)
    comment_count = serializers.ReadOnlyField()
    creator = FeedUserSerializer(read_only=True)

    class Meta:
        model = models.Post
        fields = (
            "id",
            "created_time_mdhm",
            "created_time_ymdhm",
            "created_time_ymd",
            "updated_at",
            "title",
            "post_type",
            # "description",
            "creator",
            "view_count",
            "like_count",
            "comment_count",
            "post_comments",
            "isImportant",
        )


class PostDetailSerializer(serializers.ModelSerializer):

    like_count = serializers.ReadOnlyField()
    post_comments = CommentSerializer(read_only=True, many=True)
    comment_count = serializers.ReadOnlyField()
    creator = FeedUserSerializer(read_only=True)
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = models.Post
        fields = (
            "id",
            "created_time_mdhm",
            "updated_at",
            "title",
            "post_type",
            "description",
            "creator",
            "view_count",
            "like_count",
            "comment_count",
            "post_comments",
            'is_liked'
        )

    def get_is_liked(self, obj):

        if 'request' in self.context:
            request = self.context['request']
            queryset = obj.post_likes.all()
            for data in queryset:
                if data.creator.id == request.user.id:
                    return True
            return False
        return False
