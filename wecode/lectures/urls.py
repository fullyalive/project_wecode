from django.urls import path
from . import views
app_name = "lectures"

urlpatterns = [
    path("", view=views.lecture_list_view.as_view(), name="list"),
        
    path("search/", view=views.Search.as_view(), name="search"),
    path('test/', view=views.TestView.as_view(), name='test'),
    path("<lecture_id>/", view=views.lecture_detail.as_view(), name="detail"),
    path("<lecture_id>/wish/", view=views.lecture_detail.as_view(), name="wish_lecture"),
    path("<lecture_id>/attend/", view=views.lecture_detail.as_view(), name="attend_lecture"),
    path("<lecture_id>/likes/", view=views.Likes.as_view(), name="like_lecture"),
    path("<lecture_id>/unlikes/", view=views.Unlikes.as_view(), name="unlike_lecture"),
    path("<lecture_id>/comments/", view=views.Comments.as_view(), name="comments"),
    path("<lecture_id>/comments/<comment_id>/", view=views.CommentDetail.as_view(), name="comment_detail"),
    path("<lecture_id>/comments/<comment_id>/recomments/", view=views.Recomments.as_view(), name="recomments"),
    path("<lecture_id>/comments/<comment_id>/recomments/<recomment_id>/",
         view=views.ReCommentDetail.as_view(), name="recomment_detail"),
]