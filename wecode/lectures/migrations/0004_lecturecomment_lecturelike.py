# Generated by Django 2.0.6 on 2018-07-03 05:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('lectures', '0003_auto_20180702_2024'),
    ]

    operations = [
        migrations.CreateModel(
            name='LectureComment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('message', models.TextField()),
                ('creator', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('lecture', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='lecture_comments', to='lectures.Lecture')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='LectureLike',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('creator', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('lecture', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='lecuter_likes', to='lectures.Lecture')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
