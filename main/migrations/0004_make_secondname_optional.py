from django.db import migrations, models


def fill_empty_secondname(apps, schema_editor):
    Coach = apps.get_model('main', 'Coach')
    Participant = apps.get_model('main', 'Participant')

    Coach.objects.filter(secondname__isnull=True).update(secondname='')
    Participant.objects.filter(secondname__isnull=True).update(secondname='')


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_team_can_print'),
    ]

    operations = [
        migrations.RunPython(fill_empty_secondname, migrations.RunPython.noop),
        migrations.AlterField(
            model_name='coach',
            name='secondname',
            field=models.CharField(blank=True, default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='participant',
            name='secondname',
            field=models.CharField(blank=True, default='', max_length=50),
        ),
    ]
