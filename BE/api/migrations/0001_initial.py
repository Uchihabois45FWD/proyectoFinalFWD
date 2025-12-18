# Generado por Django 5.1.2 el 2025-12-10 19:55

import django.contrib.auth.models
import django.contrib.auth.validators
import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Categoria',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre_categoria', models.CharField(max_length=50)),
                ('descripcion_categoria', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Noticias',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('imagen_noticia', models.TextField()),
                ('titulo_noticia', models.CharField(max_length=40)),
                ('descripcion_noticia', models.CharField(max_length=40)),
                ('dia_de_notificacion', models.DateField(auto_now_add=True)),
                ('destacado', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('fecha_nacimiento', models.DateField()),
                ('num_telefono', models.CharField(max_length=20)),
                ('direccion', models.TextField()),
                ('rol', models.CharField(choices=[('instructor', 'Instructor'), ('usuario', 'Usuario'), ('administrador', 'Administrador'), ('organizador', 'Organizador')], max_length=25)),
                ('imagen_perfil', models.ImageField(blank=True, null=True, upload_to='imagenes_perfil/')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='CategoriaOpciones',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre_opcion', models.CharField(max_length=100)),
                ('descripcion_opcion', models.TextField(blank=True, null=True)),
                ('activo', models.BooleanField(default=True)),
                ('categoria', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.categoria')),
            ],
        ),
        migrations.CreateModel(
            name='Curso',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('imagen_curso', models.TextField(blank=True, null=True)),
                ('nombre_curso', models.CharField(max_length=40)),
                ('descripcion_curso', models.CharField(max_length=40)),
                ('fecha_inicio_curso', models.DateField()),
                ('fecha_fin_curso', models.DateField()),
                ('destacado', models.BooleanField(default=False)),
                ('limite_cupos', models.IntegerField()),
                ('modalidad', models.CharField(choices=[('presencial', 'Presencial'), ('virtual', 'Virtual'), ('bimodal', 'Bimodal')], max_length=20)),
                ('primer_dia', models.CharField(choices=[('lunes', 'Lunes'), ('martes', 'Martes'), ('miércoles', 'Miércoles'), ('jueves', 'Jueves'), ('viernes', 'Viernes')], max_length=20)),
                ('ultimo_dia', models.CharField(choices=[('lunes', 'Lunes'), ('martes', 'Martes'), ('miércoles', 'Miércoles'), ('jueves', 'Jueves'), ('viernes', 'Viernes')], max_length=20)),
                ('certificado', models.BooleanField(default=False)),
                ('instructor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ComentariosCursos',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('contenido_comentario', models.TextField()),
                ('fecha_comentario', models.DateTimeField(auto_now_add=True)),
                ('calificacion', models.IntegerField()),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('curso', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.curso')),
            ],
        ),
        migrations.CreateModel(
            name='Evento',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo_evento', models.CharField(max_length=100)),
                ('descripcion_evento', models.TextField()),
                ('fecha_evento', models.DateField()),
                ('hora_evento', models.TimeField()),
                ('lugar_evento', models.CharField(max_length=100)),
                ('destacado', models.BooleanField(default=False)),
                ('categoria', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.categoria')),
                ('organizador', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='eventos_organizados', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Inscripcion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_inscripcion', models.DateTimeField(auto_now_add=True)),
                ('estado', models.CharField(choices=[('activa', 'Activa'), ('cancelada', 'Cancelada'), ('finalizada', 'Finalizada')], default='activa', max_length=20)),
                ('curso', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.curso')),
                ('usuario', models.ForeignKey(limit_choices_to={'rol': 'usuario'}, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='InscripcionCurso',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_inscripcion', models.DateTimeField(auto_now_add=True)),
                ('curso', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.curso')),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ComentariosNoticias',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('contenido_comentario', models.TextField()),
                ('fecha_comentario', models.DateTimeField(auto_now_add=True)),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('noticia', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comentarios', to='api.noticias')),
            ],
            options={
                'ordering': ['-fecha_comentario'],
            },
        ),
        migrations.CreateModel(
            name='Organizacion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre_organizacion', models.CharField(max_length=100)),
                ('correo_contacto', models.EmailField(max_length=254)),
                ('telefono_contacto', models.CharField(max_length=20)),
                ('descripcion', models.TextField(blank=True, null=True)),
                ('usuario', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
