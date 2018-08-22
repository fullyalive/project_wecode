from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from wecode.users import models as user_models
from django.contrib.humanize.templatetags.humanize import naturaltime
import datetime  # for deadline default
from django.contrib.contenttypes.fields import GenericRelation

@python_2_unicode_compatible
class TimeStampedModel(models.Model):

    created_at = models.DateTimeField(auto_now_add=True)  # first created
    updated_at = models.DateTimeField(auto_now=True)  # last-modified

    class Meta:
        abstract = True


@python_2_unicode_compatible
class Banner(TimeStampedModel):

    """ Banner Model """
    bannerImage = models.ImageField(null=True)
    title = models.CharField(max_length=200)
    creator = models.ForeignKey(
        user_models.User, null=True, related_name='banners', on_delete=models.CASCADE
    )
    location = models.CharField(null=True, max_length=200)
    short_description = models.TextField(null=True)
    description = models.TextField(null=True)
    attendants = models.PositiveIntegerField(default=0)
    url = models.CharField(max_length=200, null=True)

@python_2_unicode_compatible
class Images(models.Model):

    banner = models.ForeignKey(Banner, default=None, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='photo/%Y/%m')
    upload_date = models.DateTimeField('Upload Date', auto_now_add=True)
