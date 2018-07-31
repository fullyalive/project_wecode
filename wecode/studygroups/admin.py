from django.contrib import admin
from django_summernote.admin import SummernoteModelAdmin
from .models import StudyGroup, StudyLike, StudyComment, StudyImages


class PhotoInline(admin.StackedInline):
    model = StudyImages
    extra = 2


@admin.register(StudyGroup)
class StudyAdmin(SummernoteModelAdmin):
    inlines = [PhotoInline]
    list_display = ['title', 'creator', 'location', 'short_description']


@admin.register(StudyImages)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ('id', 'upload_date')


@admin.register(StudyLike)
class StudyLikeAdmin(admin.ModelAdmin):
    pass


@admin.register(StudyComment)
class StudyCommentAdmin(admin.ModelAdmin):
    pass
