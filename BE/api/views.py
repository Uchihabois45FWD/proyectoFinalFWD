from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from .models import Usuario, Curso, Inscripcion, CategoriaEvento, Evento, AsistenteEvento, Organizador, Noticias, ComentariosCursos, InscripcionCurso
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets, status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view
from .models import ComentariosNoticias
from .serializers import ComentariosNoticiasSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated as isAuthenticated

from .serializers import (
    UsuarioSerializer,
    CursoSerializer,
    InscripcionSerializer,
    CategoriaEventoSerializer,
    EventoSerializer,
    AsistenteEventoSerializer,
    OrganizadorSerializer,
    NoticiasSerializer,
    LoginSerializer,
    ComentariosCursosSerializer,
    InscripcionCursoSerializer,
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
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data["user"]

            refresh = RefreshToken.for_user(user)  # genera refresh y access token

            return Response({
                "mensaje": "Inicio de sesión exitoso",
                "usuario": user.username,
                "nombre": user.first_name,
                "apellido": user.last_name,
                "email": user.email,
                "access": str(refresh.access_token),  
                "refresh": str(refresh),               
                "id_usuario": user.id,
                "rol": user.rol
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UsuarioPorIdView(ListCreateAPIView):
    serializer_class = UsuarioSerializer
    permission_classes = [isAuthenticated]
    def get_queryset(self):
        id_usuario = self.kwargs["id_usuario"]  # llega por la url
        return Usuario.objects.filter(id=id_usuario)


class EditarUsuarioView(APIView):
    def patch(self, request):
        # lo que va a identificar al usuario
        id_usuario = request.data.get("id_usuario")
        nombre_usuario = request.data.get("username")
        correo_usuario = request.data.get("email")
        telefono_usuario = request.data.get("num_telefono")
        direccion_usuario = request.data.get("direccion")

        try:
            # traemos al usuario por el id
            usuario = Usuario.objects.get(id=id_usuario)

            """
                Si nos dieron el dato lo actualizamos

                sino, se queda igual
            """
            if nombre_usuario:
                usuario.username = nombre_usuario
            if correo_usuario:
                usuario.email = correo_usuario
            if telefono_usuario:
                usuario.num_telefono = telefono_usuario
            if direccion_usuario:
                usuario.direccion = direccion_usuario

            usuario.save()  # confirmamos y guardamos en la bashee de datoz
            return Response({"mensaje": "Usuario actualizado correctamente."}, status=status.HTTP_200_OK)
        except Usuario.DoesNotExist:
            return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)


class ComentariosCursosCreateView(ListCreateAPIView):
    queryset = ComentariosCursos.objects.all()
    serializer_class = ComentariosCursosSerializer


class InscripcionCursoCreateView(ListCreateAPIView):
    queryset = InscripcionCurso.objects.all()
    serializer_class = InscripcionCursoSerializer


class ComentariosNoticiasViewSet(viewsets.ModelViewSet):
    queryset = ComentariosNoticias.objects.all()
    serializer_class = ComentariosNoticiasSerializer

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)


@api_view(['GET', 'POST'])
def comentarios_noticias(request):
    if request.method == 'GET':
        comentarios = ComentariosNoticias.objects.all()
        serializer = ComentariosNoticiasSerializer(comentarios, many=True)
        return Response(serializer.data)

    # POST: solo usuarios autenticados pueden crear comentario
    if request.method == 'POST':
        if not request.user or not request.user.is_authenticated:
            return Response({'detail': 'Authentication credentials were not provided.'}, status=status.HTTP_401_UNAUTHORIZED)

        serializer = ComentariosNoticiasSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
