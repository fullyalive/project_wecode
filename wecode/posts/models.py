from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from wecode.users import models as user_models
from django.contrib.humanize.templatetags.humanize import naturaltime
from time import strftime
import datetime


@python_2_unicode_compatible
class TimeStampedModel(models.Model):

    created_at = models.DateTimeField(auto_now_add=True)  # first created
    updated_at = models.DateTimeField(auto_now=True)  # last-modified

    class Meta:
        abstract = True


@python_2_unicode_compatible
class Post(TimeStampedModel):

    """ Post Model """
    TYPE_CHOICES = (
        ('qna', 'Q&A'),
        ('free', '자유게시판'),
        ('ask', '문의사항')
    )
    title = models.CharField(max_length=200)
    post_type = models.CharField(max_length=80, choices=TYPE_CHOICES, null=True)
    creator = models.ForeignKey(
        user_models.User, null=True, related_name='posts', on_delete=models.CASCADE
    )
    description = models.TextField(null=True)
    view_count = models.IntegerField(default=0)

    @property
    def created_time_mdhm(self):
        return self.created_at.strftime("%m/%d %H:%M")

    @property
    def created_time_ymdhm(self):
        return self.created_at.strftime("%y/%m/%d %H:%M")

    @property
    def created_time_ymd(self):
        return self.created_at.strftime("%y/%m/%d")

    @property
    def natural_time(self):
        return naturaltime(self.created_at)

    @property
    def like_count(self):
        return self.post_likes.all().count()

    @property
    def comment_count(self):
        return self.post_comments.all().count()

    def __str__(self):
        return '{} - {}'.format(self.title, self.creator)

    class Meta:
        ordering = ['-created_at']


@python_2_unicode_compatible
class PostComment(TimeStampedModel):

    """ PostComment Model """

    message = models.TextField()
    creator = models.ForeignKey(user_models.User, null=True, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, null=True, related_name='post_comments', on_delete=models.CASCADE)
    parent = models.IntegerField(default=0, null=True)
    groupNumber = models.IntegerField(default=0, null=True)
    groupOrder = models.IntegerField(default=0, null=True)

    class Meta:
        ordering = ['groupNumber', 'groupOrder']

    def __str__(self):
        return self.message

    @property
    def created_time_mdhm(self):
        return self.created_at.strftime("%m/%d %H:%M")

    @property
    def recommentCount(self):
        return PostComment.objects.filter(post__id=self.post.id, parent=self.id).count()


@python_2_unicode_compatible
class PostLike(TimeStampedModel):

    """ Like Model """

    creator = models.ForeignKey(user_models.User, null=True, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, null=True, related_name='post_likes', on_delete=models.CASCADE)

    def __str__(self):
        return 'User: {} - Post Caption: {}'.format(self.creator.username, self.post.title)
