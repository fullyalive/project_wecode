from django.urls import path
from . import views
app_name = "posts"

urlpatterns = [
    path("", view=views.Post_list_view.as_view(), name="list"),
    path("<post_id>/", view=views.Post_detail.as_view(), name="detail"),
    path("<post_id>/likes", view=views.Likes.as_view(), name="like post"),
    path("<post_id>/unlikes", view=views.Unlikes.as_view(), name="unlike post"),
    path("<post_id>/comments", view=views.Comments.as_view(), name="comments"),
    path("<post_id>/comments/<comment_id>", view=views.CommentDetail.as_view(), name="comment_detail"),
]
