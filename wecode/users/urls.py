from django.urls import path
from . import views
app_name = "users"

urlpatterns = [
    path("create/", view=views.CreateUserView.as_view(), name="create"),
    path("updatephoto/", view=views.UpdateUserView.as_view(), name="update_photo"),
    path("<username>/password/", view=views.ChangePassword.as_view(), name="changePassword"),
    path("login/facebook/", view=views.FacebookLogin.as_view(), name='fb_login'),
    path("profile/", view=views.ProfileView.as_view(), name='profile'),
]
