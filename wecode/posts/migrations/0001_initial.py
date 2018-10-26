# Generated by Django 2.0.6 on 2018-10-26 09:47

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=200)),
                ('post_type', models.CharField(choices=[('qna', 'Q&A'), ('free', '자유게시판'), ('ask', '문의사항')], max_length=80, null=True)),
                ('description', models.TextField(null=True)),
                ('view_count', models.IntegerField(default=0)),
                ('isImportant', models.NullBooleanField(default=False)),
            ],
            options={
                'ordering': ['-isImportant', '-created_at'],
            },
        ),
        migrations.CreateModel(
            name='PostComment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('message', models.TextField()),
                ('parent', models.IntegerField(default=0, null=True)),
                ('groupNumber', models.IntegerField(default=0, null=True)),
                ('groupOrder', models.IntegerField(default=0, null=True)),
            ],
            options={
                'ordering': ['groupNumber', 'groupOrder'],
            },
        ),
        migrations.CreateModel(
            name='PostLike',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
