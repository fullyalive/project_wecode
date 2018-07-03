from rest_framework import serializers
from . import models
from wecode.lectures import serializers as lectures_serializers


class UserSerializer(serializers.ModelSerializer):

    lectures = lectures_serializers.LectureSerializer(many=True, read_only=True)
    post_count = serializers.ReadOnlyField()
    
    class Meta:
        model = models.User
        fields = '__all__'
