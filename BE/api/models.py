from django.db import models
from django.contrib.auth.models import AbstractUser


class Usuario(AbstractUser):
    ROL_OPCIONES = (
        ("instructor", "Instructor"),
        ("usuario", "Usuario"),
        ("administrador", "Administrador")
    )
    fecha_nacimiento = models.DateField()
    num_telefono = models.CharField(max_length=20)
    direccion = models.TextField()
    rol = models.CharField(choices=ROL_OPCIONES, max_length=25)

class Curso(models.Model):
    DIAS_CURSO = (
        ("lunes","Lunes"),
        ("martes","Martes"),
        ("miércoles","Miércoles"),
        ("jueves","Jueves"),
        ("viernes","Viernes")
    )
    imagen_curso = models.TextField()
    nombre_curso = models.CharField(max_length=40)
    descripcion_curso = models.CharField(max_length=40)
    fecha_inicio_curso = models.DateField()
    fecha_fin_curso = models.DateField()
    instructor = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    destacado = models.BooleanField(default=False)
    limite_cupos = models.IntegerField()
    primer_dia = models.CharField(choices=DIAS_CURSO,max_length=20)
    ultimo_dia = models.CharField(choices=DIAS_CURSO,max_length=20)

class Noticias(models.Model):
    pass   

class Inscripcion(models.Model):
    ESTADOS = (
        ("activa", "Activa"),
        ("cancelada", "Cancelada"),
        ("finalizada", "Finalizada"),
    )
    usuario = models.ForeignKey(
        Usuario, on_delete=models.CASCADE, limit_choices_to={'rol': 'usuario'}
    )
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE)
    fecha_inscripcion = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(choices=ESTADOS, max_length=20, default="activa")

class CategoriaEvento(models.Model):
    nombre_categoria = models.CharField(max_length=50)
    descripcion_categoria = models.TextField(blank=True, null=True)

class Evento(models.Model):
    titulo_evento = models.CharField(max_length=100)
    descripcion_evento = models.TextField()
    fecha_evento = models.DateField()
    hora_evento = models.TimeField()
    lugar_evento = models.CharField(max_length=100)
    categoria = models.ForeignKey(CategoriaEvento, on_delete=models.CASCADE)
    organizador = models.ForeignKey(
        Usuario, on_delete=models.CASCADE, related_name="eventos_organizados"
    )

class AsistenteEvento(models.Model):
    evento = models.ForeignKey(Evento, on_delete=models.CASCADE)
    usuario = models.ForeignKey(
        Usuario, on_delete=models.CASCADE, limit_choices_to={'rol': 'usuario'}
    )
    fecha_registro = models.DateTimeField(auto_now_add=True)

class Organizador(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE)
    nombre_organizacion = models.CharField(max_length=100)
    correo_contacto = models.EmailField()
    telefono_contacto = models.CharField(max_length=20)
    descripcion = models.TextField(blank=True, null=True)
    
    