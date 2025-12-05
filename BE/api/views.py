from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets, status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import (
    Usuario,
    Curso,
    Inscripcion,
    CategoriaEvento,
    Evento,
    AsistenteEvento,
    Organizador,
    Noticias,
    ComentariosCursos,
    InscripcionCurso,
    ComentariosNoticias,
)

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
    ComentariosNoticiasSerializer,
)


# ------------------- CRUD Básico -------------------

class UsuarioCreateView(ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [AllowAny]


class CursoCreateView(ListCreateAPIView):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer
    permission_classes = [AllowAny]


class InscripcionCreateView(ListCreateAPIView):
    queryset = Inscripcion.objects.all()
    serializer_class = InscripcionSerializer
    permission_classes = [AllowAny]


class CategoriaEventoCreateView(ListCreateAPIView):
    queryset = CategoriaEvento.objects.all()
    serializer_class = CategoriaEventoSerializer
    permission_classes = [AllowAny]


class EventoCreateView(ListCreateAPIView):
    queryset = Evento.objects.all()
    serializer_class = EventoSerializer
    permission_classes = [AllowAny]


class AsistenteEventoCreateView(ListCreateAPIView):
    queryset = AsistenteEvento.objects.all()
    serializer_class = AsistenteEventoSerializer
    permission_classes = [AllowAny]


class OrganizadorCreateView(ListCreateAPIView):
    queryset = Organizador.objects.all()
    serializer_class = OrganizadorSerializer
    permission_classes = [AllowAny]


class NoticiasCreateView(ListCreateAPIView):
    queryset = Noticias.objects.all()
    serializer_class = NoticiasSerializer
    permission_classes = [AllowAny]


# ------------------- Autenticación -------------------

class UsuarioLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data["user"]

            # Genera refresh y access token
            refresh = RefreshToken.for_user(user)

            return Response({
                "mensaje": "Inicio de sesión exitoso",
                "usuario": user.username,
                "nombre": user.first_name,
                "apellido": user.last_name,
                "email": user.email,
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "id_usuario": user.id,
                "user_id": user.id,
                "rol": user.rol
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UsuarioPorIdView(ListCreateAPIView):
    serializer_class = UsuarioSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        id_usuario = self.kwargs["id_usuario"]
        return Usuario.objects.filter(id=id_usuario)


class EditarUsuarioView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        id_usuario = request.data.get("id_usuario")
        nombre_usuario = request.data.get("username")
        correo_usuario = request.data.get("email")
        telefono_usuario = request.data.get("num_telefono")
        direccion_usuario = request.data.get("direccion")

        try:
            usuario = Usuario.objects.get(id=id_usuario)

            if nombre_usuario:
                usuario.username = nombre_usuario
            if correo_usuario:
                usuario.email = correo_usuario
            if telefono_usuario:
                usuario.num_telefono = telefono_usuario
            if direccion_usuario:
                usuario.direccion = direccion_usuario

            usuario.save()
            return Response({"mensaje": "Usuario actualizado correctamente."}, status=status.HTTP_200_OK)
        except Usuario.DoesNotExist:
            return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)


# ------------------- Comentarios -------------------

class ComentariosCursosCreateView(ListCreateAPIView):
    queryset = ComentariosCursos.objects.all()
    serializer_class = ComentariosCursosSerializer
    permission_classes = [AllowAny]


class InscripcionCursoCreateView(ListCreateAPIView):
    queryset = InscripcionCurso.objects.all()
    serializer_class = InscripcionCursoSerializer
    permission_classes = [AllowAny]


class ComentariosNoticiasViewSet(viewsets.ModelViewSet):
    queryset = ComentariosNoticias.objects.all()
    serializer_class = ComentariosNoticiasSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def comentarios_noticias(request):
    if request.method == 'GET':
        comentarios = ComentariosNoticias.objects.all()
        serializer = ComentariosNoticiasSerializer(comentarios, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        if not request.user or not request.user.is_authenticated:
            return Response({'detail': 'Authentication credentials were not provided.'}, status=status.HTTP_401_UNAUTHORIZED)

        serializer = ComentariosNoticiasSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(usuario=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def editar_perfil(request):
    usuario = request.user
    serializer = UsuarioSerializer(usuario, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)