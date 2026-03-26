from django.db import migrations, models


def copy_coaches_m2m_to_fk(apps, schema_editor):
    Team = apps.get_model('main', 'Team')
    Coach = apps.get_model('main', 'Coach')

    for coach in Coach.objects.all():
        team_ids = list(Team.objects.filter(coaches=coach).values_list('id', flat=True).order_by('id'))
        if not team_ids:
            continue

        coach.team_id = team_ids[0]
        coach.save(update_fields=['team'])

        for team_id in team_ids[1:]:
            Coach.objects.create(
                firstname=coach.firstname,
                secondname=coach.secondname,
                lastname=coach.lastname,
                email=coach.email,
                phone=coach.phone,
                tshirt_size=coach.tshirt_size,
                team_id=team_id,
            )


def copy_coaches_fk_to_m2m(apps, schema_editor):
    Team = apps.get_model('main', 'Team')
    Coach = apps.get_model('main', 'Coach')

    for coach in Coach.objects.exclude(team_id__isnull=True):
        team = Team.objects.get(id=coach.team_id)
        team.coaches.add(coach)


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_team_coaches_m2m'),
    ]

    operations = [
        migrations.AddField(
            model_name='coach',
            name='team',
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=models.SET_NULL,
                related_name='coaches',
                to='main.team',
            ),
        ),
        migrations.RunPython(copy_coaches_m2m_to_fk, copy_coaches_fk_to_m2m),
        migrations.RemoveField(
            model_name='team',
            name='coaches',
        ),
    ]
