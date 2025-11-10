from django.db import models
from django.contrib.auth.models import AbstractUser


class Usuario(AbstractUser):
    ROL_OPCIONES = (
        ("instructor","Instructor"),
        ("usuario","Usuario"),
        ("administrador","Administrador")
    )
    fecha_nacimiento = models.DateField()
    num_telefono = models.CharField(max_length=20)
    direccion = models.TextField()
    rol = models.CharField(choices=ROL_OPCIONES,max_length=25)

class Curso(models.Model):
    nombre_curso = models.CharField(max_length=40)
    descripcion_curso = models.CharField(max_length=40)
    fecha_inicio_curso = models.DateField()
    fecha_fin_curso = models.DateField()
    instructor = models.ForeignKey(Usuario,on_delete=models.CASCADE)
