from django.contrib import admin
from . import models
from django_summernote.admin import SummernoteModelAdmin


@admin.register(models.Banner)
class BannerAdmin(SummernoteModelAdmin):
    list_display = ['id', 'title', 'creator', 'location', 'short_description']


# @admin.register(models.Banner)
# class BannerAdmin(admin.ModelAdmin):
#     pass
