from django.urls import path
from . import views
app_name = "users"

urlpatterns = [
    path("create", view=views.CreateUserView.as_view(), name="create"),
    path("update", view=views.UpdateUserView.as_view(), name="update"),
    path("<username>/password", view=views.ChangePassword.as_view(), name="changePassword"),
    path("login/facebook/", view=views.FacebookLogin.as_view(), name='fb_login')
]
