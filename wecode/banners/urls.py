from django.urls import path
from . import views
app_name = "banners"

urlpatterns = [
    path("", view=views.banner_list_view.as_view(), name="list"),
    path("<banner_id>/", view=views.banner_detail.as_view(), name="detail"),
]
