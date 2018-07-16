from django.contrib import admin
from . import models


@admin.register(models.StudyGroups)
class StudyAdmin(admin.ModelAdmin):
    pass


@admin.register(models.StudyLike)
class StudyLikeAdmin(admin.ModelAdmin):
    pass


@admin.register(models.StudyComment)
class StudyCommentAdmin(admin.ModelAdmin):
    pass
