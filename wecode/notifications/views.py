from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers

class Notification(APIView):

    def get(self, request, format=None):

        user = request.user

        notifications = models.Notification.objects.filter(to=user)

        serializer = serializers.NotificationSerializer(notifications, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


def create_notification(creator, to, notification_type, lecture=None, post=None,
                        comment=None):
    print(creator, to, notification_type, lecture, post, comment)
    notification = models.Notification.objects.create(
        creator=creator,
        to=to,
        notification_type=notification_type,
        lecture=lecture,
        post=post,
        comment=comment
    )

    notification.save()