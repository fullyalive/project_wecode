from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import SearchFilter
from . import models, serializers
from wecode.users import serializers as user_serializers
from wecode.users import models as user_models
from wecode.notifications import views as notification_views
from django.shortcuts import get_object_or_404
from django.core.exceptions import ValidationError


class Post_list_view(generics.ListCreateAPIView):

    queryset = models.Post.objects.all()
    serializer_class = serializers.PostSerializer
    filter_backends = [SearchFilter]
    search_fields = ['title', 'description']
    pagination_class = PageNumberPagination

    def get_serializer_class(self):

        if self.request.method == 'POST':

            return serializers.PostDetailSerializer

        return serializers.PostSerializer

    def get_serializer_context(self):

        return {'request': self.request}

    def perform_create(self, serializer):

        serializer.save(creator=self.request.user)


class Post_detail(generics.RetrieveUpdateDestroyAPIView):

    queryset = models.Post.objects.all()
    serializer_class = serializers.PostDetailSerializer

    def perform_update(self, serializer):                    # UPDATE 커스텀은 이 함수를 재정의하세요.

        serializer.save(creator=self.request.user)

    def destroy(self, request, *args, **kwargs):

        instance = self.get_object()
        if instance.creator != request.user:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class Likes(APIView):

    def get(self, request, post_id, format=None):

        likes = models.PostLike.objects.filter(post__id=post_id)

        like_createor_ids = likes.values('creator_id')

        users = user_models.User.objects.filter(id__in=like_createor_ids)
        serializer = serializers.FeedUserSerializer(users, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, post_id, format=None):

        user = request.user

        try:
            found_post = models.Post.objects.get(id=post_id)
        except models.Post.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            preexisting_like = models.PostLike.objects.get(
                creator=user,
                post=found_post
            )

            return Response(status=status.HTTP_302_FOUND)

        except models.PostLike.DoesNotExist:

            new_like = models.PostLike.objects.create(
                creator=user,
                post=found_post
            )

            new_like.save()

            return Response(status=status.HTTP_201_CREATED)


class Unlikes(APIView):

    def delete(self, request, post_id, format=None):

        user = request.user

        try:
            preexisting_like = models.PostLike.objects.get(
                creator=user,
                post__id=post_id
            )
            preexisting_like.delete()

            return Response(status=status.HTTP_204_NO_CONTENT)

        except models.PostLike.DoesNotExist:

            return Response(status=status.HTTP_302_FOUND)


class Comments(generics.ListCreateAPIView):

    queryset = models.PostComment.objects.all()
    serializer_class = serializers.CommentSerializer
    filter_backends = [SearchFilter]
    search_fields = ['message']
    pagination_class = PageNumberPagination

    def get_queryset(self):
        return models.PostComment.objects.filter(post__id=self.kwargs['post_id'])

    def perform_create(self, serializer):

        user = self.request.user
        found_post = get_object_or_404(models.Post, id=self.kwargs['post_id'])

        serializer.save(creator=user, post=found_post)
        notification_views.create_notification(user, found_post.creator,
                                               'post_comment', post=found_post, comment=serializer.data['message'])


class CommentDetail(APIView):

    def find_own_comment(self, comment_id, user):
        try:
            comment = models.PostComment.objects.get(id=comment_id, creator=user)
            return comment
        except models.PostComment.DoesNotExist:
            return None
            serializer.save(creator=user)

    def put(self, request, post_id, comment_id, format=None):

        user = request.user

        comment = self.find_own_comment(comment_id, user)
        if comment is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        serializer = serializers.CommentSerializer(
            comment, data=request.data, partial=True
        )

        if serializer.is_valid():

            serializer.save(creator=user)

            return Response(data=serializer.data, status=status.HTTP_204_NO_CONTENT)

        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, post_id, comment_id, format=None):

        user = request.user

        try:
            comment_to_delete = models.PostComment.objects.get(
                id=comment_id, post__id=post_id, creator=user)
            comment_to_delete.delete()

        except models.PostComment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(status=status.HTTP_204_NO_CONTENT)
