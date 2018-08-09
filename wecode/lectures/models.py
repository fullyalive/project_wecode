from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from wecode.users import models as user_models
from django.contrib.humanize.templatetags.humanize import naturaltime, intcomma
import datetime  # for deadline default
from django.contrib.contenttypes.fields import GenericRelation
from hitcount.models import HitCount, HitCountMixin
from time import strftime
# from django.template.defaultfilters import date


@python_2_unicode_compatible
class TimeStampedModel(models.Model):

    created_at = models.DateTimeField(auto_now_add=True)  # first created
    updated_at = models.DateTimeField(auto_now=True)  # last-modified

    class Meta:
        abstract = True


@python_2_unicode_compatible
class Lecture(TimeStampedModel, HitCountMixin):

    """ Lecture Model """
    hit_count_generic = GenericRelation(
        HitCount, object_id_field='object_pk',
        related_query_name='hit_count_generic_relation')
    lectureImage = models.ImageField(null=True)
    title = models.CharField(max_length=200)
    creator = models.ForeignKey(
        user_models.User, null=True, related_name='lectures', on_delete=models.CASCADE
    )
    location = models.CharField(blank=True, max_length=200)
    short_description = models.TextField(blank=True)
    description = models.TextField(blank=True)

    price = models.IntegerField(null=True)

    startDate = models.DateField(null=True)
    endDate = models.DateField(null=True)
    startTime = models.TimeField(null=True)
    endTime = models.TimeField(null=True)
    day1 = models.CharField(null=True, blank=True, max_length=200)
    day2 = models.CharField(null=True, blank=True, max_length=200)

    attend_users = models.ManyToManyField(user_models.User, blank=True, related_name="attend_lectures")
    wish_users = models.ManyToManyField(user_models.User, blank=True, related_name="wish_lectures")

    career1 = models.TextField(blank=True)
    career2 = models.TextField(blank=True)
    contents = models.TextField(blank=True)
    curriculum1 = models.TextField(blank=True)
    curriculum2 = models.TextField(blank=True)

    @property
    def natural_time(self):
        return naturaltime(self.created_at)

    @property
    def comma_price(self):
        return intcomma(self.price)

    @property
    def start_date(self):
        # return date(self.startDate, "m/d ") 이것도 작동된다.
        return self.startDate.strftime("%m.%d")

    @property
    def end_date(self):
        return self.endDate.strftime("%m.%d")

    @property
    def start_time(self):
        return self.startTime.strftime("%H:%M")

    @property
    def end_time(self):
        return self.endTime.strftime("%H:%M")

    @property
    def like_count(self):
        return self.lecture_likes.all().count()

    @property
    def comment_count(self):
        return self.lecutre_comments.all().count()

    def __str__(self):
        return '{} - {}'.format(self.title, self.creator)

    class Meta:
        ordering = ['-created_at']


@python_2_unicode_compatible
class LectureComment(TimeStampedModel):

    """ Comment Model """

    message = models.TextField()
    creator = models.ForeignKey(user_models.User, null=True, on_delete=models.CASCADE)
    lecture = models.ForeignKey(Lecture, null=True, on_delete=models.CASCADE, related_name='lecture_comments')
    parent = models.IntegerField(default=0, null=True)
    groupNumber = models.IntegerField(default=0, null=True)
    groupOrder = models.IntegerField(default=0, null=True)

    def __str__(self):
        return self.message

    class Meta:
        ordering = ['groupNumber', 'groupOrder']

    @property
    def created_time_mdhm(self):
        return self.created_at.strftime("%m.%d %H:%M")


@python_2_unicode_compatible
class LectureLike(TimeStampedModel):

    """ Like Model """

    creator = models.ForeignKey(user_models.User, null=True, on_delete=models.CASCADE)
    lecture = models.ForeignKey(Lecture, null=True, on_delete=models.CASCADE, related_name='lecture_likes')

    def __str__(self):
        return 'User: {} - Lecture Caption: {}'.format(self.creator.username, self.lecture.title)


@python_2_unicode_compatible
class LectureImages(models.Model):

    lecture = models.ForeignKey(Lecture, default=None, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='photo/%Y/%m')
    upload_date = models.DateTimeField('Upload Date', auto_now_add=True)
