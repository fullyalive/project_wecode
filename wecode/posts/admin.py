from django.contrib import admin
from . import models


@admin.register(models.Post)
class PostAdmin(admin.ModelAdmin):
    pass

@admin.register(models.PostLike)
class LikeAdmin(admin.ModelAdmin):
    pass

@admin.register(models.PostComment)
class CommentAdmin(admin.ModelAdmin):
    pass
