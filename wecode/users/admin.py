from django import forms
from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.contrib.auth import get_user_model 
from django.contrib.auth.admin import UserAdmin as AuthUserAdmin
from .models import User

from wecode.users.forms import UserChangeForm, UserCreationForm
User = get_user_model()


@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):

    form = UserChangeForm
    add_form = UserCreationForm

    fieldsets = (("User Profile", {"fields": ("name", "profile_image", 'bio', 'website', 'gender')}),) + \
        auth_admin.UserAdmin.fieldsets
    list_display = ["username", "name", "is_superuser"]
    search_fields = ["name"]

