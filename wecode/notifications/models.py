from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from wecode.users import models as user_models
from wecode.lectures import models as lecture_models
from wecode.studygroups import models as study_models
from wecode.posts import models as post_models
class Notification(lecture_models.TimeStampedModel):

    TYPE_CHOICES = (
        ('like', 'Like'),
        ('comment', 'Comment'),
        ('follow', 'Follow'),
    )

    creator = models.ForeignKey(user_models.User, related_name='creator', on_delete=models.CASCADE)
    to = models.ForeignKey(user_models.User, related_name='to', on_delete=models.CASCADE)
    notification_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    lecture = models.ForeignKey(lecture_models.Lecture, on_delete=models.CASCADE, null=True, blank=True)
    study = models.ForeignKey(study_models.StudyGroup, on_delete=models.CASCADE, null=True, blank=True)
    post = models.ForeignKey(post_models.Post, on_delete=models.CASCADE, null=True, blank=True)
    comment = models.TextField(null=True, blank=True)
