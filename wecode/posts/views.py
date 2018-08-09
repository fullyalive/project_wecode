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


class PopularPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page'
    max_page_size = 1000


class Post_list_view(generics.ListCreateAPIView):

    queryset = models.Post.objects.all()
    serializer_class = serializers.PostSerializer
    filter_backends = [SearchFilter]
    search_fields = ['title', 'description']
    pagination_class = PageNumberPagination

    def get_queryset(self):

        queryset = models.Post.objects.all()
        post_type = self.request.query_params.get('type', None)
        if post_type is not None:
            queryset = queryset.filter(post_type=post_type)
        return queryset

    def get_serializer_class(self):

        if self.request.method == 'POST':

            return serializers.PostDetailSerializer

        return serializers.PostSerializer

    def get_serializer_context(self):

        return {'request': self.request}

    def perform_create(self, serializer):

        serializer.save(creator=self.request.user)


class Post_popular(generics.ListCreateAPIView):

    queryset = models.Post.objects.all()
    serializer_class = serializers.PostSerializer
    pagination_class = PopularPagination

    def get_queryset(self):

        qna_post = models.Post.objects.filter(post_type='qna')[:6]
        free_post = models.Post.objects.filter(post_type='free')[:6]
        ask_post = models.Post.objects.filter(post_type='ask')[:6]
        queryset = [x for x in qna_post] + [y for y in free_post] + [z for z in ask_post]

        return queryset

    def get_serializer_class(self):

        if self.request.method == 'POST':

            return serializers.PostDetailSerializer

        return serializers.PostSerializer

    def get_serializer_context(self):

        return {'request': self.request}


class Post_detail(APIView):

    def find_own_post(self, post_id, user):
        try:
            post = models.Post.objects.get(id=post_id, creator=user)
            return post

        except models.Post.DoesNotExist:
            return None

    def get(self, request, post_id, format=None):

        post = get_object_or_404(models.Post, pk=post_id)
        post.view_count = post.view_count + 1
        post.save()
        serializer = serializers.PostSerializer(post)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def put(self, request, post_id, format=None):

        user = request.user

        post = self.find_own_post(post_id, user)
        if post is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        serializer = serializers.PostSerializer(
            post, data=request.data, partial=True
        )

        if serializer.is_valid():

            serializer.save(creator=user)

            return Response(data=serializer.data, status=status.HTTP_302_FOUND)

        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, post_id, format=None):

        user = request.user

        post = self.find_own_post(post_id, user)

        if post is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        post.delete()

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


class Comments(APIView):

    def get(self, request, post_id, format=None):

        try:
            comments = models.PostComment.objects.filter(post__id=post_id)

            serializer = serializers.CommentSerializer(comments, many=True)

            return Response(data=serializer.data, status=status.HTTP_200_OK)

        except models.Post.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request, post_id, format=None):

        user = request.user

        try:
            found_post = models.Post.objects.get(id=post_id)
        except models.Post.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.CommentSerializer(data=request.data)

        if serializer.is_valid():
            count = models.PostComment.objects.filter(post__id=post_id, parent=0).count()
            serializer.save(creator=user, post=found_post, groupNumber=count + 1)
            notification_views.create_notification(
                user, found_post.creator, 'comment', post=found_post, comment=serializer.data['message'])

            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        else:

            return Response(datea=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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

            return Response(data=serializer.data, status=status.HTTP_302_FOUND)

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


class Recomments(APIView):

    def get(self, request, post_id, comment_id, format=None):

        try:
            comments = models.PostComment.objects.filter(post__id=post_id, parent=comment_id)

            serializer = serializers.CommentSerializer(comments, many=True)

            return Response(data=serializer.data, status=status.HTTP_200_OK)

        except models.Post.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request, post_id, comment_id, format=None):

        user = request.user

        try:
            found_post = models.Post.objects.get(id=post_id)
            found_comment = models.PostComment.objects.get(id=comment_id, post__id=post_id)
        except models.Post.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.CommentSerializer(data=request.data)

        if serializer.is_valid():

            groupOrder = models.PostComment.objects.filter(post__id=post_id, parent=comment_id).count() + 1
            serializer.save(creator=user, post=found_post, parent=comment_id,
                            groupNumber=found_comment.groupNumber, groupOrder=groupOrder)
            notification_views.create_notification(user, found_post.creator,
                                                   'post_recomment', post=found_post, comment=serializer.data['message'])

            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        else:

            return Response(datea=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReCommentDetail(APIView):

    def find_own_post(self, post_id, user):
        try:
            post = models.Post.objects.get(id=post_id, creator=user)
            return post

        except models.Post.DoesNotExist:
            return None

    def find_own_recomment(self, comment_id, recomment_id, user):
        try:
            recomment = models.PostComment.objects.get(id=recomment_id, parent=comment_id, creator=user)
            return recomment
        except models.PostComment.DoesNotExist:
            return None

    def get(self, request, post_id, comment_id, recomment_id, format=None):

        user = request.user

        try:
            recomment = models.PostComment.objects.get(
                id=recomment_id, post__id=post_id, parent=comment_id)
        except models.PostComment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.CommentSerializer(recomment)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def put(self, request, post_id, comment_id, recomment_id, format=None):

        user = request.user

        recomment = self.find_own_recomment(comment_id, recomment_id, user)
        if recomment is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        serializer = serializers.CommentSerializer(
            recomment, data=request.data, partial=True
        )

        if serializer.is_valid():

            serializer.save(creator=user)

            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, post_id, comment_id, recomment_id, format=None):

        user = request.user

        try:
            comment_to_delete = models.PostComment.objects.get(
                id=recomment_id, post__id=post_id, parent=comment_id, creator=user)
            comment_to_delete.delete()

        except models.PostComment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(status=status.HTTP_204_NO_CONTENT)
