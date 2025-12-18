# Generado por Django 6.0 el 2025-12-13 04:57

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_fix_evento_model'),
    ]

    operations = [
        migrations.AlterField(
            model_name='evento',
            name='categoria',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.categoria'),
        ),
    ]
