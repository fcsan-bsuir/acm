from django.db import migrations, models


def copy_coach_to_coaches(apps, schema_editor):
    Team = apps.get_model('main', 'Team')
    for team in Team.objects.all():
        if team.coach_id:
            team.coaches.add(team.coach_id)


def reverse_copy_coaches(apps, schema_editor):
    Team = apps.get_model('main', 'Team')
    for team in Team.objects.all():
        coach_ids = list(team.coaches.values_list('id', flat=True))
        if coach_ids:
            team.coach_id = coach_ids[0]
            team.save(update_fields=['coach'])


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_make_secondname_optional'),
    ]

    operations = [
        migrations.AddField(
            model_name='team',
            name='coaches',
            field=models.ManyToManyField(blank=True, related_name='teams', to='main.coach'),
        ),
        migrations.RunPython(copy_coach_to_coaches, reverse_copy_coaches),
        migrations.RemoveField(
            model_name='team',
            name='coach',
        ),
    ]
