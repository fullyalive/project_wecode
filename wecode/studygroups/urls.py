from django.urls import path
from . import views
app_name = "studygroups"

urlpatterns = [
    path("", view=views.study_list_view.as_view(), name="list"),
    path("<study_id>/", view=views.study_detail.as_view(), name="detail"),
    path("<study_id>/likes/", view=views.Likes.as_view(), name="like study"),
    path("<study_id>/unlikes/", view=views.Unlikes.as_view(), name="unlike study"),
    path("<study_id>/comments/", view=views.Comments.as_view(), name="comments"),
    path("<study_id>/comments/<comment_id>/", view=views.CommentDetail.as_view(), name="comment_detail"),

]
