# Generated by Django 2.0.6 on 2018-07-31 09:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lectures', '0013_auto_20180731_1847'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lecture',
            name='career1',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='lecture',
            name='career2',
            field=models.TextField(blank=True),
        ),
    ]