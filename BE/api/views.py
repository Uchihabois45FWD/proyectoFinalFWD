from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from .models import Usuario, Curso, Inscripcion, CategoriaEvento, Evento, AsistenteEvento,Organizador
from django.contrib.auth import authenticate
from rest_framework.response import Response

from .serializers import (
    UsuarioSerializer,
    CursoSerializer,
    InscripcionSerializer,
    CategoriaEventoSerializer,
    EventoSerializer,
    AsistenteEventoSerializer,
    OrganizadorSerializer
)
from rest_framework.views import APIView

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
    
class OrganizadorCreateView(ListCreateAPIView):
    queryset = Organizador.objects.all()
    serializer_class = OrganizadorSerializer

class UsuarioLoginView(APIView):
    def post(self,request):
        usuario = request.data.get("username")
        clave = request.data.get("password")
        
        usuario_login = authenticate(username=usuario,password=clave)
        
        
        if usuario_login is not None:
            return Response({"mensaje":"Incio de sesion exitoso"})
        else:
            return Response({"mensaje":"Nonono"})
            