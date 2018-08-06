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
        model = models.PostComment
        fields = (
            'id',
            'message',
            'creator',
            'created_time_mdhm'
            # 'parent'
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
            "description",
            "creator",
            "like_count",
            "comment_count",
            "post_comments"
        )


class PostDetailSerializer(serializers.ModelSerializer):

    like_count = serializers.ReadOnlyField()
    post_comments = CommentSerializer(read_only=True, many=True)
    comment_count = serializers.ReadOnlyField()
    creator = FeedUserSerializer(read_only=True)

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
            "like_count",
            "comment_count",
            "post_comments"
        )
