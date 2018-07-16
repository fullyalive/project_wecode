from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers
from hitcount.views import HitCountDetailView, HitCountMixin
from hitcount.models import HitCount
from wecode.users import serializers as user_serializers
from wecode.users import models as user_models
from wecode.notifications import views as notification_views


class study_list_view(APIView):

    def get(self, request, format=None):

        studygroups = models.StudyGroups.objects.all()

        serializer = serializers.StudySerializer(studygroups, many=True, context={'request': request})

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):

        user = request.user

        serializer = serializers.StudySerializer(data=request.data)

        if serializer.is_valid():

            serializer.save(creator=user)

            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        else:

            return Response(datea=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class study_detail(APIView, HitCountDetailView):

    def find_own_study(self, study_id, user):
        try:
            study = models.StudyGroups.objects.get(id=study_id, creator=user)
            return study

        except models.StudyGroups.DoesNotExist:
            return None

    def get(self, request, study_id, format=None):

        user = request.user

        study = self.find_own_study(study_id, user)

        try:
            study = models.StudyGroups.objects.get(id=study_id)
        except models.StudyGroups.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # if study is None:
        #     return Response(status=status.HTTP_400_BAD_REQUEST)

        serializer = serializers.StudySerializer(study, context={'request': request})

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def put(self, request, study_id, format=None):

        user = request.user

        study = self.find_own_study(study_id, user)

        if study is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        serializer = serializers.StudySerializer(
            study, data=request.data, partial=True
        )

        if serializer.is_valid():

            serializer.save(creator=user)

            return Response(data=serializer.data, status=status.HTTP_204_NO_CONTENT)

        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, study_id, format=None):

        user = request.user

        study = self.find_own_study(study_id, user)

        if study is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        study.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class Likes(APIView):

    def get(self, request, study_id, format=None):

        study_likes = models.StudyLike.objects.filter(study__id=study_id)

        like_createor_ids = study_likes.values('creator_id')

        users = user_models.User.objects.filter(id__in=like_createor_ids)

        serializer = user_serializers.FeedUserSerializer(users, many=True, context={'request': request})

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, study_id, format=None):

        user = request.user

        try:
            found_study = models.StudyGroups.objects.get(id=study_id)
        except models.StudyGroups.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            preexisting_like = models.StudyLike.objects.get(
                creator=user,
                study=found_study
            )
            return Response(status=status.HTTP_304_NOT_MODIFIED)

        except models.StudyLike.DoesNotExist:

            new_like = models.StudyLike.objects.create(
                creator=user,
                study=found_study
            )

            new_like.save()

            # notification_views.create_notification(user, found_image.creator, 'like', found_image)

            return Response(status=status.HTTP_201_CREATED)


class Unlikes(APIView):

    def delete(self, request, study_id, format=None):

        user = request.user

        try:
            preexisting_like = models.StudyLike.objects.get(
                creator=user,
                study__id=study_id
            )
            preexisting_like.delete()

            return Response(status=status.HTTP_204_NO_CONTENT)

        except models.StudyLike.DoesNotExist:

            return Response(status=status.HTTP_304_NOT_MODIFIED)


class Comments(APIView):

    def get(self, request, study_id, format=None):

        try:
            comments = models.StudyComment.objects.filter(study__id=study_id)

            serializer = serializers.CommentSerializer(comments, many=True)

            return Response(data=serializer.data, status=status.HTTP_200_OK)

        except models.StudyGroups.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request, study_id, format=None):

        user = request.user

        try:
            found_study = models.StudyGroups.objects.get(id=study_id)
        except models.StudyGroups.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.CommentSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save(creator=user, study=found_study)

            notification_views.create_notification(
                user, found_study.creator, 'comment', study=found_study, comment=serializer.data['message'])

            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        else:

            return Response(datea=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CommentDetail(APIView):
    def find_own_comment(self, comment_id, user):
        try:
            comment = models.StudyComment.objects.get(id=comment_id, creator=user)
            return comment
        except models.StudyComment.DoesNotExist:
            return None

    def get(self, request, study_id, comment_id, format=None):

        user = request.user

        try:
            comment = models.StudyComment.objects.get(id=comment_id, study__id=study_id)
        except models.StudyComment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.CommentSerializer(comment)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def put(self, request, study_id, comment_id, format=None):

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

    def delete(self, request, study_id, comment_id, format=None):

        user = request.user

        try:
            comment_to_delete = models.StudyComment.objects.get(
                id=comment_id, study__id=study_id, creator=user)
            comment_to_delete.delete()

        except models.StudyComment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(status=status.HTTP_204_NO_CONTENT)
