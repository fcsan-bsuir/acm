# Generated by Django 5.1.6 on 2025-05-02 12:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_team_location'),
    ]

    operations = [
        migrations.AddField(
            model_name='team',
            name='can_print',
            field=models.BooleanField(default=False),
        ),
    ]
