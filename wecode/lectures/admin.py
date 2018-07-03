from django.contrib import admin
from . import models


@admin.register(models.Lecture)
class LectureAdmin(admin.ModelAdmin):
    pass

@admin.register(models.LectureLike)
class LectureLikeAdmin(admin.ModelAdmin):
    pass

@admin.register(models.LectureComment)
class LectureCommentAdmin(admin.ModelAdmin):
    pass