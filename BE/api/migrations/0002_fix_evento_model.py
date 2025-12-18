# Generado por Django 5.1.2 el 2025-12-12 21:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='evento',
            old_name='titulo_evento',
            new_name='titulo',
        ),
        migrations.RenameField(
            model_name='evento',
            old_name='descripcion_evento',
            new_name='descripcion',
        ),
        migrations.RenameField(
            model_name='evento',
            old_name='fecha_evento',
            new_name='fecha',
        ),
        migrations.RenameField(
            model_name='evento',
            old_name='hora_evento',
            new_name='hora',
        ),
        migrations.RenameField(
            model_name='evento',
            old_name='lugar_evento',
            new_name='lugar',
        ),
        migrations.AlterField(
            model_name='evento',
            name='categoria',
            field=models.CharField(choices=[('charla', 'Charla'), ('taller', 'Taller'), ('conferencia', 'Conferencia')], max_length=50),
        ),
        migrations.AddField(
            model_name='evento',
            name='cupos',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='evento',
            name='imagen',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='evento',
            name='organizador',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='eventos_organizados', to='api.usuario'),
        ),
    ]
