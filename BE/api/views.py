from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from .models import Usuario, Curso, Inscripcion, CategoriaEvento, Evento, AsistenteEvento
from .serializers import (
    UsuarioSerializer,
    CursoSerializer,
    InscripcionSerializer,
    CategoriaEventoSerializer,
    EventoSerializer,
    AsistenteEventoSerializer
)

class UsuarioCreateView(ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class CursoCreateView(ListCreateAPIView):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer

class InscripcionCreateView(ListCreateAPIView):
    queryset = Inscripcion.objects.all()
    serializer_class = InscripcionSerializer

class CategoriaEventoCreateView(ListCreateAPIView):
    queryset = CategoriaEvento.objects.all()
    serializer_class = CategoriaEventoSerializer

class EventoCreateView(ListCreateAPIView):
    queryset = Evento.objects.all()
    serializer_class = EventoSerializer

class AsistenteEventoCreateView(ListCreateAPIView):
    queryset = AsistenteEvento.objects.all()
    serializer_class = AsistenteEventoSerializer
