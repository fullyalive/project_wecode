from django.contrib import admin
from . import models


@admin.register(models.Banner)
class BannerAdmin(admin.ModelAdmin):
    pass
