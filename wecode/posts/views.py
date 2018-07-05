from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers
from wecode.users import serializers as user_serializers
from wecode.users import models as user_models

class Post_list_view(APIView):

    def get(self, request, format=None):

        posts = models.Post.objects.all()

        serializer = serializers.PostSerializer(posts, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

class Post_detail(APIView):

    def find_own_post(self, post_id, user):
        try:
            post = models.Post.objects.get(id=post_id, creator=user)
            return post

        except models.Post.DoesNotExist:
            return None

    def get(self, request, post_id, format=None):

        user = request.user

        post = self.find_own_post(post_id, user)

        if post is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

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

            return Response(data=serializer.data, status=status.HTTP_204_NO_CONTENT)

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

            serializer.save(creator=user, post=found_post)

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

    def get(self, request, post_id, comment_id, format=None):

        user = request.user

        try:
            comment = models.PostComment.objects.get(id=comment_id, post__id=post_id)
        except models.PostComment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.CommentSerializer(comment)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

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
