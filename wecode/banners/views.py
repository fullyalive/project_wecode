from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers
from hitcount.views import HitCountDetailView, HitCountMixin
from hitcount.models import HitCount
from wecode.users import serializers as user_serializers
from wecode.users import models as user_models
from wecode.notifications import views as notification_views


class banner_list_view(APIView):

    def get(self, request, format=None):

        banners = models.Banner.objects.all()

        serializer = serializers.BannerSerializer(banners, many=True, context={'request': request})

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):

        user = request.user

        serializer = serializers.BannerSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save(creator=user)

            return Response(data=serializer.data, status=status.HTTP_201_CREATED)

        else:

            return Response(datea=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class banner_detail(APIView, HitCountDetailView):

    def find_own_banner(self, banner_id, user):
        try:
            banner = models.Banner.objects.get(id=banner_id, creator=user)
            return banner

        except models.Banner.DoesNotExist:
            return None

    def get(self, request, banner_id, format=None):

        user = request.user

        banner = self.find_own_banner(banner_id, user)

        try:
            banner = models.Banner.objects.get(id=banner_id)
        except models.Banner.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # if banner is None:
        #     return Response(status=status.HTTP_400_BAD_REQUEST)

        serializer = serializers.BannerSerializer(banner, context={'request': request})

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def put(self, request, banner_id, format=None):

        user = request.user

        banner = self.find_own_banner(banner_id, user)

        if banner is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        serializer = serializers.BannerSerializer(
            banner, data=request.data, partial=True
        )

        if serializer.is_valid():

            serializer.save(creator=user)

            return Response(data=serializer.data, status=status.HTTP_204_NO_CONTENT)

        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, banner_id, format=None):

        user = request.user

        banner = self.find_own_banner(banner_id, user)

        if banner is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        banner.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
