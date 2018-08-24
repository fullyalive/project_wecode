from django.conf import settings
from django.urls import include, path
from django.conf.urls import url
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView
from django.views import defaults as default_views
from rest_framework_jwt.views import obtain_jwt_token
from wecode import views

urlpatterns = [
    path("api-token-auth", obtain_jwt_token),
    path("api/rest-auth/", include("rest_auth.urls")),
    path("api/rest-auth/registration/", include("rest_auth.registration.urls")),
    # Django Admin, use {% url 'admin:index' %}
    path(settings.ADMIN_URL, admin.site.urls),
    path(
        "api/banners/",
        include("wecode.banners.urls", namespace="banners"),
    ),
    path(
        "api/lectures/",
        include("wecode.lectures.urls", namespace="lectures"),
    ),
    path(
        "api/studygroups/",
        include("wecode.studygroups.urls", namespace="studygroups"),
    ),
    path(
        "api/posts/",
        include("wecode.posts.urls", namespace="posts"),
    ),
    path(
        "api/notifications/",
        include("wecode.notifications.urls", namespace="notifications"),
    ),
    # User management
    path(
        "api/users/",
        include("wecode.users.urls", namespace="users"),
    ),
    path("api/accounts/", include("allauth.urls")),
    path("api/summernote/", include('django_summernote.urls')),
    
    # Your stuff: custom urls includes go here
] + static(
    settings.MEDIA_URL, document_root=settings.MEDIA_ROOT
)

urlpatterns += [
    url(r'^', views.ReactAppView.as_view()),  # catch all URL
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
