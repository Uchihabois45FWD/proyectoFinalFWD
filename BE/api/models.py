from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings


class Usuario(AbstractUser):
    ROL_OPCIONES = (
        ("instructor", "Instructor"),
        ("usuario", "Usuario"),
        ("administrador", "Administrador"),
        ("organizador", "Organizador")
    )
    fecha_nacimiento = models.DateField()
    num_telefono = models.CharField(max_length=20)
    direccion = models.TextField()
    rol = models.CharField(choices=ROL_OPCIONES, max_length=25)
    imagen_perfil = models.ImageField(upload_to="imagenes_perfil/", blank=True, null=True)

class Categoria(models.Model):
    nombre_categoria = models.CharField(max_length=50)
    descripcion_categoria = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nombre_categoria

class CategoriaOpciones(models.Model):
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    nombre_opcion = models.CharField(max_length=100)
    descripcion_opcion = models.TextField(blank=True, null=True)
    activo = models.BooleanField(default=True)
    
class Curso(models.Model):
    DIAS_CURSO = (
        ("lunes","Lunes"),
        ("martes","Martes"),
        ("miércoles","Miércoles"),
        ("jueves","Jueves"),
        ("viernes","Viernes")
    )
    MODALIDADES = (
        ("presencial","Presencial"),
        ("virtual","Virtual"),
        ("bimodal","Bimodal"),
    )
    imagen_curso = models.TextField(null=True, blank=True)
    nombre_curso = models.CharField(max_length=40)
    descripcion_curso = models.CharField(max_length=40)
    fecha_inicio_curso = models.DateField()
    fecha_fin_curso = models.DateField()
    instructor = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    destacado = models.BooleanField(default=False)
    limite_cupos = models.IntegerField()
    modalidad = models.CharField(max_length=20,choices=MODALIDADES)
    primer_dia = models.CharField(choices=DIAS_CURSO,max_length=20)
    ultimo_dia = models.CharField(choices=DIAS_CURSO,max_length=20)
    certificado = models.BooleanField(default=False)
    

class Noticias(models.Model):
    imagen_noticia = models.TextField()
    titulo_noticia = models.CharField(max_length=40)
    descripcion_noticia = models.CharField(max_length=40)
    dia_de_notificacion = models.DateField(auto_now_add=True)
    destacado = models.BooleanField(default=False)

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


class Evento(models.Model):
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField()
    fecha = models.DateField()
    hora = models.TimeField()
    lugar = models.CharField(max_length=100)
    categoria = models.CharField(max_length=50, choices=[
        ('charla', 'Charla'),
        ('taller', 'Taller'),
        ('conferencia', 'Conferencia')
    ])
    cupos = models.IntegerField(default=0)
    imagen = models.URLField(blank=True, null=True)
    destacado = models.BooleanField(default=False)
    organizador = models.ForeignKey(
        Usuario, on_delete=models.CASCADE, related_name="eventos_organizados", null=True, blank=True
    )

class Organizacion(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE)
    nombre_organizacion = models.CharField(max_length=100)
    correo_contacto = models.EmailField()
    telefono_contacto = models.CharField(max_length=20)
    descripcion = models.TextField(blank=True, null=True)
    

class ComentariosCursos(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE)
    contenido_comentario = models.TextField()
    fecha_comentario = models.DateTimeField(auto_now_add=True)
    calificacion = models.IntegerField()
    
class InscripcionCurso(models.Model):
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    fecha_inscripcion = models.DateTimeField(auto_now_add=True) 
    
    
class ComentariosNoticias(models.Model):
    noticia = models.ForeignKey('Noticias', on_delete=models.CASCADE, related_name='comentarios')
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    contenido_comentario = models.TextField()
    fecha_comentario = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-fecha_comentario']

    def __str__(self):
        return f"Comentario de {self.usuario.username} en {self.noticia.titulo_noticia}"
    

