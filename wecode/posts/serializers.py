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
            "created_at",
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
            "created_at",
            "updated_at",
            "title",
            "post_type",
            "description",
            "creator",
            "like_count",
            "comment_count",
            "post_comments"
        )
