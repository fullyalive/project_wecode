from django.contrib.auth import get_user_model  # If used custom user model
from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from . import models
from wecode.lectures import serializers as lectures_serializers
from wecode.studygroups import serializers as studygroups_serializers
from wecode.posts.models import Post

class PasswordResetSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.User
        fields = (
            'email'
        )

class FeedUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.User
        fields = ('id','username')


class UserSerializer(serializers.ModelSerializer):

    lectures = lectures_serializers.UserUseLectureSerializer(many=True, read_only=True)
    attend_lectures = lectures_serializers.UserUseLectureSerializer(many=True, read_only=True)
    wish_lectures = lectures_serializers.UserUseLectureSerializer(many=True, read_only=True)

    studygroups = studygroups_serializers.UserUseStudySerializer(many=True, read_only=True)
    attend_studygroups = studygroups_serializers.UserUseStudySerializer(many=True, read_only=True)
    wish_studygroups = studygroups_serializers.UserUseStudySerializer(many=True, read_only=True)

    class Meta:
        model = models.User
        fields = ('id', 'username',  'email', 'name', 'lectures','studygroups', 
                  'date_joined', 'profile_image', 'bio', 'website', 'phone', 'gender',
                  'attend_lectures', 'wish_lectures', 
                  'attend_studygroups', 'wish_studygroups'
                  )


class BasicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ('id', 'username', 'password', 'email')
        write_only_fields = ('password',)
        read_only_fields = ('id',)

    def create(self, validated_data):
        user = models.User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()

        return user


class UserProfileSerializer(serializers.ModelSerializer):

    # images = images_serializers.CountImageSerializer(many=True, read_only=True)
    post_count = serializers.ReadOnlyField()
    answer_count = serializers.SerializerMethodField()
    followers_count = serializers.ReadOnlyField()
    following_count = serializers.ReadOnlyField()

    class Meta:
        model = models.User
        fields = (
            'profile_image',
            'username',
            'name',
            'bio',
            'website',
            'post_count',
            'followers_count',
            'following_count',
            'answer_count'
        )
    
    def get_answer_count(self, obj):
        post_qs = Post.objects.filter(creator__username=obj.username)
        return post_qs.count()


class ListUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.User
        fields = (
            'id',
            'profile_image',
            'username',
            'name'
        )


class SignUpSerializer(RegisterSerializer):

    name = serializers.CharField(required=True, write_only=True)

    def get_cleaned_data(self):
        return {
            'name': self.validated_data.get('name', ''),
            'username': self.validated_data.get('username', ''),
            'password': self.validated_data.get('password', ''),
            'email': self.validated_data.get('email', '')
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        setup_user_email(request, user, [])
        user.save()
        return user

