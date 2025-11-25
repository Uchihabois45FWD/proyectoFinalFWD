from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from .models import Usuario, Curso, Inscripcion, CategoriaEvento, Evento, AsistenteEvento,Organizador,Noticias
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import (
    UsuarioSerializer,
    CursoSerializer,
    InscripcionSerializer,
    CategoriaEventoSerializer,
    EventoSerializer,
    AsistenteEventoSerializer,
    OrganizadorSerializer,
    NoticiasSerializer,
    LoginSerializer
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
    
class OrganizadorCreateView(ListCreateAPIView):
    queryset = Organizador.objects.all()
    serializer_class = OrganizadorSerializer

class NoticiasCreateView(ListCreateAPIView):
    queryset = Noticias.objects.all()
    serializer_class = NoticiasSerializer

class UsuarioLoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data) # el traductorsh
        if serializer.is_valid(): # si existe el usuario
            user = serializer.validated_data["user"]
            token = str(RefreshToken.for_user(user))
            return Response({
                "mensaje": "Inicio de sesión exitoso",
                "usuario": user.username,
                "nombre": user.first_name,
                "apellido": user.last_name,
                "email": user.email,
                "token": token,
                "id_usuario": user.id,
                "rol": user.rol
            }, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UsuarioPorIdView(ListCreateAPIView):
    serializer_class = UsuarioSerializer
    
    def get_queryset(self):
        id_usuario = self.kwargs["id_usuario"] # llega por la url
        return Usuario.objects.filter(id=id_usuario)