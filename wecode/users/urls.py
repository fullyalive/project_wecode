from django.urls import path, include
from . import views

# 니꼴라스 2-10 강의에서 임포트 되어 있는 상황인 것
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView
from django.views import defaults as default_views

app_name = "users"

urlpatterns = [
    path("create", view=views.CreateUserView.as_view(), name="create"),
    path("update", view=views.UpdateUserView.as_view(), name="update"),
    path("<username>/password", view=views.ChangePassword.as_view(), name="changePassword"),

]
