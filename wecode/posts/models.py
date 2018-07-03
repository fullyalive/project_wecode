from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from wecode.users import models as user_models
from django.contrib.humanize.templatetags.humanize import naturaltime
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
        ('etc', '기타')
    )
    title = models.CharField(max_length=200)
    post_type = models.CharField(max_length=80, choices=TYPE_CHOICES, null=True)
    creator = models.ForeignKey(
        user_models.User, null=True, related_name='posts', on_delete=models.CASCADE
    )
    description = models.TextField(null=True)

    @property
    def natural_time(self):
        return naturaltime(self.created_at)
    
    @property
    def like_count(self):
        return self.likes.all().count()

    @property
    def comment_count(self):
        return self.comments.all().count()

    def __str__(self):
        return '{} - {}'.format(self.title, self.creator)

    class Meta:
        ordering = ['-created_at']


@python_2_unicode_compatible
class PostComment(TimeStampedModel):

    """ Comment Model """

    message = models.TextField()
    post_creator = models.ForeignKey(user_models.User, null=True, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, null=True, related_name='post_comments', on_delete=models.CASCADE)

    def __str__(self):
        return self.message


@python_2_unicode_compatible
class PostLike(TimeStampedModel):

    """ Like Model """

    creator = models.ForeignKey(user_models.User, null=True, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, null=True, related_name='post_likes', on_delete=models.CASCADE)

    def __str__(self):
        return 'User: {} - Post Caption: {}'.format(self.creator.username, self.post.title)
