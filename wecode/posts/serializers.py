from rest_framework import serializers
from . import models
from wecode.users import models as user_models

class PostSerializer(serializers.ModelSerializer):

    like_count = serializers.ReadOnlyField()
    comment_count =serializers.ReadOnlyField()
    
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
            "comment_count"
        )

class FeedUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = user_models.User
        fields = '__all__'
