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

        studygroups = models.StudyGroup.objects.all()

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
            study = models.StudyGroup.objects.get(id=study_id, creator=user)
            return study

        except models.StudyGroup.DoesNotExist:
            return None

    def get(self, request, study_id, format=None):

        user = request.user

        study = self.find_own_study(study_id, user)

        try:
            study = models.StudyGroup.objects.get(id=study_id)
        except models.StudyGroup.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # if study is None:
        #     return Response(status=status.HTTP_400_BAD_REQUEST)

        serializer = serializers.StudyDetailSerializer(study, context={'request': request})

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

            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, study_id, format=None):

        user = request.user

        study = self.find_own_study(study_id, user)

        if study is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        study.delete()

        return Response(status=status.HTTP_201_CREATED)


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
            found_study = models.StudyGroup.objects.get(id=study_id)
        except models.StudyGroup.DoesNotExist:
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

        except models.StudyGroup.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request, study_id, format=None):

        user = request.user

        try:
            found_study = models.StudyGroup.objects.get(id=study_id)
        except models.StudyGroup.DoesNotExist:
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

            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

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


class Search(APIView):

    def get(self, request, format=None):

        title = request.query_params.get('title', None)
        creator = request.query_params.get('creator', None)

        if title is None and creator is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        studyGroup1 = title is not None and models.StudyGroup.objects.filter(
            title__istartswith=title) or models.StudyGroup.objects.none()
        studyGroup2 = creator is not None and models.StudyGroup.objects.filter(
            creator__username__istartswith=creator) or models.StudyGroup.objects.none()
        mergeStudyGroups = studyGroup1 | studyGroup2

        serializer = serializers.StudySerializer(
            mergeStudyGroups, many=True, context={"request": request})

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class Wish_Study(APIView):

    def find_own_study(self, study_id):
        try:
            study = models.StudyGroup.objects.get(id=study_id)
            return study

        except models.StudyGroup.DoesNotExist:
            return None

    def post(self, request, study_id, format=None):

        user = request.user

        study = self.find_own_study(study_id)
        if study is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        study.wish_users.add(user)
        study.save()

        return Response(status=status.HTTP_302_FOUND)

    def delete(self, request, study_id, format=None):

        user = request.user

        study = self.find_own_study(study_id)

        if study is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        study.wish_users.remove(user)
        study.save()

        return Response(status=status.HTTP_204_NO_CONTENT)


class Attend_Study(APIView):

    def find_own_study(self, study_id):
        try:
            study = models.StudyGroup.objects.get(id=study_id)
            return study

        except models.StudyGroup.DoesNotExist:
            return None

    def post(self, request, study_id, format=None):

        user = request.user

        study = self.find_own_study(study_id)
        if study is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        study.attend_users.add(user)
        study.save()

        return Response(status=status.HTTP_302_FOUND)

    def delete(self, request, study_id, format=None):

        user = request.user

        study = self.find_own_study(study_id)

        if study is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        study.attend_users.remove(user)
        study.save()

        return Response(status=status.HTTP_204_NO_CONTENT)


class Recomments(APIView):

    def get(self, request, study_id, comment_id, format=None):

        try:
            comments = models.StudyComment.objects.filter(study__id=study_id, parent__id=comment_id)

            serializer = serializers.CommentSerializer(comments, many=True)

            return Response(data=serializer.data, status=status.HTTP_200_OK)

        except models.StudyGroup.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request, study_id, comment_id, format=None):

        user = request.user

        try:
            found_study = models.StudyGroup.objects.get(id=study_id)
            found_comment = models.StudyComment.objects.get(id=comment_id, study__id=study_id)
        except models.StudyGroup.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.CommentSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save(creator=user, study=found_study, parent=found_comment)

            notification_views.create_notification(user, found_study.creator,
                                                   'study_recomment', study=found_study, comment=serializer.data['message'])

            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        else:

            return Response(datea=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReCommentDetail(APIView):

    def find_own_study(self, study_id, user):
        try:
            study = models.StudyGroup.objects.get(id=study_id, creator=user)
            return study

        except models.StudyGroup.DoesNotExist:
            return None

    def find_own_recomment(self, comment_id, recomment_id, user):
        try:
            recomment = models.StudyComment.objects.get(id=recomment_id, parent__id=comment_id, creator=user)
            return recomment
        except models.StudyComment.DoesNotExist:
            return None

    def get(self, request, study_id, comment_id, recomment_id, format=None):

        user = request.user

        try:
            recomment = models.StudyComment.objects.get(
                id=recomment_id, study__id=study_id, parent__id=comment_id)
        except models.StudyComment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.CommentSerializer(recomment)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def put(self, request, study_id, comment_id, recomment_id, format=None):

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

    def delete(self, request, study_id, comment_id, recomment_id, format=None):

        user = request.user

        try:
            comment_to_delete = models.StudyComment.objects.get(
                id=recomment_id, study__id=study_id, parent__id=comment_id, creator=user)
            comment_to_delete.delete()

        except models.StudyComment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(status=status.HTTP_204_NO_CONTENT)
