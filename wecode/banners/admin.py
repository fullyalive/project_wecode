from django.contrib import admin
from .models import Banner, Images
from django_summernote.admin import SummernoteModelAdmin


class PhotoInline(admin.StackedInline):
    model = Images
    extra = 2


@admin.register(Banner)
class BannerAdmin(SummernoteModelAdmin):
    inlies = [PhotoInline]
    list_display = ['title', 'creator', 'location', 'short_description']


@admin.register(Images)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ('id', 'upload_date')
