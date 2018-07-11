from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from wecode.users import models as user_models
from django.contrib.humanize.templatetags.humanize import naturaltime
import datetime  # for deadline default
from django.contrib.contenttypes.fields import GenericRelation
from hitcount.models import HitCount, HitCountMixin

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
    location = models.CharField(null=True, max_length=200)
    short_description = models.TextField(null=True)
    description = models.TextField(null=True)


    @property
    def natural_time(self):
        return naturaltime(self.created_at)
    
    @property
    def like_count(self):
        return self.lecture_likes.all().count() 

    def __str__(self):
        return '{} - {}'.format(self.title, self.creator)

    class Meta:
        ordering = ['-created_at']


@python_2_unicode_compatible
class LectureComment(TimeStampedModel):

    """ Comment Model """

    message = models.TextField()
    creator = models.ForeignKey(user_models.User, null=True, on_delete=models.CASCADE)
    lecture = models.ForeignKey(Lecture, null=True, related_name='lecture_comments', on_delete=models.CASCADE)

    def __str__(self):
        return self.message


@python_2_unicode_compatible
class LectureLike(TimeStampedModel):

    """ Like Model """

    creator = models.ForeignKey(user_models.User, null=True, on_delete=models.CASCADE)
    lecture = models.ForeignKey(Lecture, null=True, related_name='lecture_likes', on_delete=models.CASCADE)

    def __str__(self):
        return 'User: {} - Lecture Caption: {}'.format(self.creator.username, self.lecture.title)
