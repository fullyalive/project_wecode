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

class BannerSerializer(serializers.ModelSerializer):

    creator = FeedUserSerializer(read_only=True)

    class Meta:
        model = models.Banner
        fields = ('id', 'description', 'short_description', 'location', 'creator',
                  'bannerImage', 'title', 'updated_at')