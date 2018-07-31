from django.contrib import admin
from .models import Lecture, LectureLike, LectureComment, LectureImages


class PhotoInline(admin.StackedInline):
    model = LectureImages
    extra = 2


@admin.register(Lecture)
class LectureAdmin(admin.ModelAdmin):
    inlines = [PhotoInline]
    list_display = ['title', 'creator', 'location', 'short_description', 'price']


@admin.register(LectureImages)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ('id', 'upload_date', 'lecture')


@admin.register(LectureLike)
class LectureLikeAdmin(admin.ModelAdmin):
    pass


@admin.register(LectureComment)
class LectureCommentAdmin(admin.ModelAdmin):
    pass
