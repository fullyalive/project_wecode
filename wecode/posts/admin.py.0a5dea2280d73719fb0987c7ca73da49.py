from django.contrib import admin
from django_summernote.admin import SummernoteModelAdmin
from . import models


@admin.register(models.Post)
class PostAdmin(SummernoteModelAdmin)):
    pass

@admin.register(models.PostLike)
class LikeAdmin(admin.ModelAdmin):
    pass

@admin.register(models.PostComment)
class CommentAdmin(admin.ModelAdmin):
    pass
