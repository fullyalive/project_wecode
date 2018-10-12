from django.contrib import admin
from django_summernote.admin import SummernoteModelAdmin
from . import models


@admin.register(models.Post)
class PostAdmin(SummernoteModelAdmin):
    # list_filter = ('post_type')
    list_display = ['id','title', 'post_type', 'creator',
                    'view_count','created_at']
    fields = ['title', 'post_type', 'creator', 'description',
              'view_count', 'isImportant', 'created_at', 'updated_at']
    list_display_links = ('title','creator')

@admin.register(models.PostLike)
class LikeAdmin(admin.ModelAdmin):
    pass

@admin.register(models.PostComment)
class CommentAdmin(admin.ModelAdmin):
    pass


