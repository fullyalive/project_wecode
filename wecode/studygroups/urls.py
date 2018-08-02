from django.urls import path
from . import views
app_name = "studygroups"

urlpatterns = [
    path("", view=views.study_list_view.as_view(), name="list"),
    path("search/", view=views.Search.as_view(), name="search"),
    path("<study_id>/wish/", view=views.study_detail.as_view(), name="wish_study"),
    path("<study_id>/attend/", view=views.study_detail.as_view(), name="attend_study"),
    path("<study_id>/", view=views.study_detail.as_view(), name="detail"),
    path("<study_id>/likes/", view=views.Likes.as_view(), name="like_study"),
    path("<study_id>/unlikes/", view=views.Unlikes.as_view(), name="unlike_study"),
    path("<study_id>/comments/", view=views.Comments.as_view(), name="comments"),
    path("<study_id>/comments/<comment_id>/", view=views.CommentDetail.as_view(), name="comment_detail"),
    path("<study_id>/comments/<comment_id>/recomments/", view=views.Recomments.as_view(), name="recomments"),
    path("<study_id>/comments/<comment_id>/recomments/<recomment_id>/",
         view=views.ReCommentDetail.as_view(), name="recomment_detail"),

]
