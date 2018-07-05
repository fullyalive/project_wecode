from django.conf import settings
from django.urls import include, path
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView
from django.views import defaults as default_views
from wecode import views
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    path("api-token-auth", obtain_jwt_token),
    # Django Admin, use {% url 'admin:index' %}
    path(settings.ADMIN_URL, admin.site.urls),
    path(
        "lectures/",
        include("wecode.lectures.urls", namespace="lectures"),
    ),
    path(
        "posts/",
        include("wecode.posts.urls", namespace="posts"),
    ),
    path(
        "notifications/",
        include("wecode.notifications.urls", namespace="notifications"),
    ),
    # User management
    path(
        "users/",
        include("wecode.users.urls", namespace="users"),
    ),

    path("accounts/", include("allauth.urls")),
    # Your stuff: custom urls includes go here
] + static(
    settings.MEDIA_URL, document_root=settings.MEDIA_ROOT
)

urlpatterns += [
    path("", views.ReactAppView.as_view()),  # catch all URL
]
if settings.DEBUG:
    # This allows the error pages to be debugged during development, just visit
    # these url in browser to see how these error pages look like.
    urlpatterns += [
        path(
            "400/",
            default_views.bad_request,
            kwargs={"exception": Exception("Bad Request!")},
        ),
        path(
            "403/",
            default_views.permission_denied,
            kwargs={"exception": Exception("Permission Denied")},
        ),
        path(
            "404/",
            default_views.page_not_found,
            kwargs={"exception": Exception("Page not Found")},
        ),
        path("500/", default_views.server_error),
    ]
    if "debug_toolbar" in settings.INSTALLED_APPS:
        import debug_toolbar

        urlpatterns = [path("__debug__/", include(debug_toolbar.urls))] + urlpatterns
