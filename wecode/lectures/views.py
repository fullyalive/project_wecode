from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers
from hitcount.views import HitCountDetailView, HitCountMixin
from hitcount.models import HitCount
from wecode.users import serializers as user_serializers
from wecode.users import models as user_models

class lecture_list_view(APIView):

    def get(self, request, format=None):

        lectures = models.Lecture.objects.all()

        serializer = serializers.LectureSerializer(lectures, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        
        user = request.user

        serializer = serializers.LectureSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save(creator=user)

            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        else:

            return Response(datea=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class lecture_detail(APIView, HitCountDetailView):

    def find_own_lecture(self, lecture_id, user):
        try:
            lecture = models.Lecture.objects.get(id=lecture_id, creator=user)
            return lecture

        except models.Lecture.DoesNotExist:
            return None

    def get(self, request, lecture_id, format=None):

        user = request.user

        lecture = self.find_own_lecture(lecture_id, user)

        if lecture is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        serializer = serializers.LectureSerializer(lecture)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def put(self, request, lecture_id, format=None):

        user = request.user

        lecture = self.find_own_lecture(lecture_id, user)
        if lecture is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        serializer = serializers.LectureSerializer(
            lecture, data=request.data, partial=True
        )

        if serializer.is_valid():

            serializer.save(creator=user)

            return Response(data=serializer.data, status=status.HTTP_204_NO_CONTENT)

        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, lecture_id, format=None):

        user = request.user

        lecture = self.find_own_lecture(lecture_id, user)

        if lecture is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        lecture.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class Likes(APIView):

    def get(self, request, lecture_id, format=None):

        likes = models.LectureLike.objects.filter(lecture__id=lecture_id)

        like_createor_ids = likes.values('creator_id')

        users = user_models.User.objects.filter(id__in=like_createor_ids)
        serializer = serializers.FeedUserSerializer(users, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, lecture_id, format=None):

        user = request.user

        try:
            found_lecture = models.Lecture.objects.get(id=lecture_id)
        except models.Lecture.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            preexisting_like = models.LectureLike.objects.get(
                creator=user,
                lecture=found_lecture
            )

            return Response(status=status.HTTP_302_FOUND)

        except models.LectureLike.DoesNotExist:

            new_like = models.LectureLike.objects.create(
                creator=user,
                lecture=found_lecture
            )

            new_like.save()

            return Response(status=status.HTTP_201_CREATED)


class Unlikes(APIView):

     def delete(self, request, lecture_id, format=None):

        user = request.user

        try:
            preexisting_like = models.LectureLike.objects.get(
                creator=user,
                lecture__id=lecture_id
            )
            preexisting_like.delete()

            return Response(status=status.HTTP_204_NO_CONTENT)

        except models.LectureLike.DoesNotExist:

            return Response(status=status.HTTP_302_FOUND)


class Comments(APIView):

    def get(self, request, lecture_id, format=None):

        try:
            comments = models.LectureComment.objects.filter(lecture__id=lecture_id)

            serializer = serializers.CommentSerializer(comments, many=True)

            return Response(data=serializer.data, status=status.HTTP_200_OK)

        except models.Lecture.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request, lecture_id, format=None):

        user = request.user

        try:
            found_lecture = models.Lecture.objects.get(id=lecture_id)
        except models.Lecture.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.CommentSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save(creator=user, lecture=found_lecture)

            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        else:

            return Response(datea=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CommentDetail(APIView):
    def find_own_comment(self, comment_id, user):
        try:
            comment = models.LectureComment.objects.get(id=comment_id, creator=user)
            return comment
        except models.LectureComment.DoesNotExist:
            return None

    def get(self, request, lecture_id, comment_id, format=None):

        user = request.user

        try:
            comment = models.LectureComment.objects.get(id=comment_id, lecture__id=lecture_id)
        except models.LectureComment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.CommentSerializer(comment)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def put(self, request, lecture_id, comment_id, format=None):

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

    def delete(self, request, lecture_id, comment_id, format=None):

        user = request.user

        try:
            comment_to_delete = models.LectureComment.objects.get(
                id=comment_id, lecture__id=lecture_id, creator=user)
            comment_to_delete.delete()

        except models.LectureComment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(status=status.HTTP_204_NO_CONTENT)
