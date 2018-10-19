# Generated by Django 2.0.6 on 2018-08-10 13:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('studygroups', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='studylike',
            name='creator',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='studylike',
            name='study',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='study_likes', to='studygroups.StudyGroup'),
        ),
        migrations.AddField(
            model_name='studyimages',
            name='studygroup',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='studygroups.StudyGroup'),
        ),
        migrations.AddField(
            model_name='studygroup',
            name='attend_users',
            field=models.ManyToManyField(blank=True, related_name='attend_studygroups', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='studygroup',
            name='creator',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='studygroups', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='studygroup',
            name='wish_users',
            field=models.ManyToManyField(blank=True, related_name='wish_studygroups', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='studycomment',
            name='creator',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='studycomment',
            name='study',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='study_comments', to='studygroups.StudyGroup'),
        ),
    ]