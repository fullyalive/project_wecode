from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.filters import SearchFilter
from rest_framework.pagination import PageNumberPagination
from . import models, serializers

from wecode.users import serializers as user_serializers
from wecode.users import models as user_models
from wecode.notifications import views as notification_views
from django.shortcuts import get_object_or_404


class lecture_list_view(generics.ListCreateAPIView):

    queryset = models.Lecture.objects.all()
    serializer_class = serializers.LectureSerializer
    filter_backends = [SearchFilter]
    search_fields = ['title', 'id']
    pagination_class = PageNumberPagination

    def get_serializer_class(self):

        if self.request.method == 'Lecture':

            return serializers.LectureDetailSerializer

        return serializers.LectureSerializer

    def get_serializer_context(self):

        return {'request': self.request}

    def perform_create(self, serializer):

        serializer.save(creator=self.request.user)


class lecture_detail(APIView):

    def find_own_lecture(self, lecture_id, user):
        try:
            lecture = models.Lecture.objects.get(id=lecture_id, creator=user)
            return lecture

        except models.Lecture.DoesNotExist:
            return None

    def get(self, request, lecture_id, format=None):

        lecture = get_object_or_404(models.Lecture, id=lecture_id)

        # if lecture is None:
        #     return Response(status=status.HTTP_400_BAD_REQUEST)

        serializer = serializers.LectureDetailSerializer(lecture, context={'request': request})

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

            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

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

        lecture_likes = models.LectureLike.objects.filter(lecture__id=lecture_id)

        like_creator_ids = lecture_likes.values('creator_id')

        users = user_models.User.objects.filter(id__in=like_creator_ids)

        serializer = user_serializers.FeedUserSerializer(users, many=True, context={'request': request})

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
            return Response(status=status.HTTP_304_NOT_MODIFIED)

        except models.LectureLike.DoesNotExist:

            new_like = models.LectureLike.objects.create(
                creator=user,
                lecture=found_lecture
            )

            new_like.save()

            # notification_views.create_notification(user, found_image.creator, 'like', found_image)

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

            return Response(status=status.HTTP_304_NOT_MODIFIED)


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

            count = models.LectureComment.objects.filter(lecture__id=lecture_id, parent=0).count()
            serializer.save(creator=user, lecture=found_lecture, groupNumber=count + 1)

            notification_views.create_notification(
                user, found_lecture.creator, 'comment', lecture=found_lecture, comment=serializer.data['message'])

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

            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

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


class Search(APIView):

    def get(self, request, format=None):

        title = request.query_params.get('title', None)
        creator = request.query_params.get('creator', None)

        if title is None and creator is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        lectures1 = title is not None and models.Lecture.objects.filter(
            title__istartswith=title) or models.Lecture.objects.none()
        lectures2 = creator is not None and models.Lecture.objects.filter(
            creator__username__istartswith=creator) or models.Lecture.objects.none()
        mergeLectures = lectures1 | lectures2

        serializer = serializers.LectureSerializer(
            mergeLectures, many=True, context={"request": request})

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class Wish_Lecture(APIView):

    def find_own_lecture(self, lecture_id):
        try:
            lecture = models.Lecture.objects.get(id=lecture_id)
            return lecture

        except models.Lecture.DoesNotExist:
            return None

    def post(self, request, lecture_id, format=None):

        user = request.user

        lecture = self.find_own_lecture(lecture_id)
        if lecture is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        lecture.wish_users.add(user)
        lecture.save()

        return Response(status=status.HTTP_302_FOUND)

    def delete(self, request, lecture_id, format=None):

        user = request.user

        lecture = self.find_own_lecture(lecture_id)

        if lecture is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        lecture.wish_users.remove(user)
        lecture.save()

        return Response(status=status.HTTP_204_NO_CONTENT)


class Attend_Lecture(APIView):

    def find_own_lecture(self, lecture_id):
        try:
            lecture = models.Lecture.objects.get(id=lecture_id)
            return lecture

        except models.Lecture.DoesNotExist:
            return None

    def post(self, request, lecture_id, format=None):

        user = request.user

        lecture = self.find_own_lecture(lecture_id)
        if lecture is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        lecture.attend_users.add(user)
        lecture.save()

        return Response(status=status.HTTP_302_FOUND)

    def delete(self, request, lecture_id, format=None):

        user = request.user

        lecture = self.find_own_lecture(lecture_id)

        if lecture is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        lecture.attend_users.remove(user)
        lecture.save()

        return Response(status=status.HTTP_204_NO_CONTENT)


class Recomments(APIView):

    def get(self, request, lecture_id, comment_id, format=None):

        try:
            comments = models.LectureComment.objects.filter(lecture__id=lecture_id, parent=comment_id)

            serializer = serializers.CommentSerializer(comments, many=True)

            return Response(data=serializer.data, status=status.HTTP_200_OK)

        except models.Lecture.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request, lecture_id, comment_id, format=None):

        user = request.user

        try:
            found_lecture = models.Lecture.objects.get(id=lecture_id)
            found_comment = models.LectureComment.objects.get(id=comment_id, lecture__id=lecture_id)
        except models.Lecture.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.CommentSerializer(data=request.data)

        if serializer.is_valid():

            groupOrder = models.LectureComment.objects.filter(lecture__id=lecture_id, parent=comment_id).count() + 1
            serializer.save(creator=user, lecture=found_lecture, parent=comment_id,
                            groupNumber=found_comment.groupNumber, groupOrder=groupOrder)

            notification_views.create_notification(user, found_lecture.creator,
                                                   'lecture_recomment', lecture=found_lecture, comment=serializer.data['message'])

            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        else:

            return Response(datea=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReCommentDetail(APIView):

    def find_own_lecture(self, lecture_id, user):
        try:
            lecture = models.Lecture.objects.get(id=lecture_id, creator=user)
            return lecture

        except models.Lecture.DoesNotExist:
            return None

    def find_own_recomment(self, comment_id, recomment_id, user):
        try:
            recomment = models.LectureComment.objects.get(id=recomment_id, parent=comment_id, creator=user)
            return recomment
        except models.LectureComment.DoesNotExist:
            return None

    def get(self, request, lecture_id, comment_id, recomment_id, format=None):

        user = request.user

        try:
            recomment = models.LectureComment.objects.get(
                id=recomment_id, lecture__id=lecture_id, parent=comment_id)
        except models.LectureComment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.CommentSerializer(recomment)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def put(self, request, lecture_id, comment_id, recomment_id, format=None):

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

    def delete(self, request, lecture_id, comment_id, recomment_id, format=None):

        user = request.user

        try:
            comment_to_delete = models.LectureComment.objects.get(
                id=recomment_id, lecture__id=lecture_id, parent=comment_id, creator=user)
            comment_to_delete.delete()

        except models.LectureComment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(status=status.HTTP_204_NO_CONTENT)
