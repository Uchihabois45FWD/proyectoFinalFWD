from django.shortcuts import render
<<<<<<< HEAD
=======
from rest_framework.generics import ListCreateAPIView, DestroyAPIView, RetrieveUpdateDestroyAPIView
from .models import Usuario, Curso, Inscripcion, CategoriaEvento, Evento, AsistenteEvento,Organizador,Noticias, ComentariosCursos, InscripcionCurso
>>>>>>> d9dd4453354d36f6b527b13a4e073e2c3340d902
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
<<<<<<< HEAD
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
=======
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
>>>>>>> d9dd4453354d36f6b527b13a4e073e2c3340d902

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

<<<<<<< HEAD

# ------------------- CRUD Básico -------------------

=======
>>>>>>> d9dd4453354d36f6b527b13a4e073e2c3340d902
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
<<<<<<< HEAD
    permission_classes = [AllowAny]


=======
    
>>>>>>> d9dd4453354d36f6b527b13a4e073e2c3340d902
class OrganizadorCreateView(ListCreateAPIView):
    queryset = Organizador.objects.all()
    serializer_class = OrganizadorSerializer
    permission_classes = [AllowAny]

class NoticiasCreateView(ListCreateAPIView):
    queryset = Noticias.objects.all()
    serializer_class = NoticiasSerializer
    permission_classes = [AllowAny]

<<<<<<< HEAD

# ------------------- Autenticación -------------------

=======
>>>>>>> d9dd4453354d36f6b527b13a4e073e2c3340d902
class UsuarioLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data) # el traductorsh
        if serializer.is_valid(): # si existe el usuario
            user = serializer.validated_data["user"]
<<<<<<< HEAD

            # Genera refresh y access token
            refresh = RefreshToken.for_user(user)

=======
            token = str(RefreshToken.for_user(user))
>>>>>>> d9dd4453354d36f6b527b13a4e073e2c3340d902
            return Response({
                "mensaje": "Inicio de sesión exitoso",
                "imagen_perfil": user.imagen_perfil.url if user.imagen_perfil else None,
                "usuario": user.username,
                "nombre": user.first_name,
                "apellido": user.last_name,
                "email": user.email,
<<<<<<< HEAD
                "access": str(refresh.access_token),
                "refresh": str(refresh),
=======
                "token": token,
>>>>>>> d9dd4453354d36f6b527b13a4e073e2c3340d902
                "id_usuario": user.id,
                "user_id": user.id,
                "rol": user.rol
            }, status=status.HTTP_200_OK)
<<<<<<< HEAD

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UsuarioPorIdView(ListCreateAPIView):
    serializer_class = UsuarioSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        id_usuario = self.kwargs["id_usuario"]
=======
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UsuarioPorIdView(ListCreateAPIView):
    serializer_class = UsuarioSerializer
    
    def get_queryset(self):
        id_usuario = self.kwargs["id_usuario"] # llega por la url
>>>>>>> d9dd4453354d36f6b527b13a4e073e2c3340d902
        return Usuario.objects.filter(id=id_usuario)

class EditarUsuarioView(APIView):
<<<<<<< HEAD
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        id_usuario = request.data.get("id_usuario")
=======
    def patch(self,request):
        id_usuario = request.data.get("id_usuario")  # lo que va a identificar al usuario
>>>>>>> d9dd4453354d36f6b527b13a4e073e2c3340d902
        nombre_usuario = request.data.get("username")
        correo_usuario = request.data.get("email")
        telefono_usuario = request.data.get("num_telefono")
        direccion_usuario = request.data.get("direccion")
        imagen_perfil = request.FILES.get("imagen_perfil")

        try:
<<<<<<< HEAD
            usuario = Usuario.objects.get(id=id_usuario)
=======
            usuario = Usuario.objects.get(id=id_usuario)  # traemos al usuario por el id
>>>>>>> d9dd4453354d36f6b527b13a4e073e2c3340d902

            if nombre_usuario:
                usuario.username = nombre_usuario
            if correo_usuario:
                usuario.email = correo_usuario
            if telefono_usuario:
                usuario.num_telefono = telefono_usuario
            if direccion_usuario:
                usuario.direccion = direccion_usuario
            if imagen_perfil:
                usuario.imagen_perfil = imagen_perfil

<<<<<<< HEAD
            usuario.save()
            return Response({"mensaje": "Usuario actualizado correctamente."}, status=status.HTTP_200_OK)
        except Usuario.DoesNotExist:
            return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)


# ------------------- Comentarios -------------------

class ComentariosCursosCreateView(ListCreateAPIView):
    queryset = ComentariosCursos.objects.all()
    serializer_class = ComentariosCursosSerializer
    permission_classes = [AllowAny]


=======
            usuario.save() # confirmamos y guardamos en la base de datos

            # Devolvemos el usuario actualizado
            serializer = UsuarioSerializer(usuario)
            return Response({
                "mensaje": "Usuario actualizado correctamente.",
                "usuario": serializer.data
            }, status=status.HTTP_200_OK)
        except Usuario.DoesNotExist:
            return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
    
class ComentariosCursosCreateView(ListCreateAPIView):
    queryset = ComentariosCursos.objects.all()
    serializer_class = ComentariosCursosSerializer
    
>>>>>>> d9dd4453354d36f6b527b13a4e073e2c3340d902
class InscripcionCursoCreateView(ListCreateAPIView):
    queryset = InscripcionCurso.objects.all()
    serializer_class = InscripcionCursoSerializer
    permission_classes = [AllowAny]

class EliminarUsuarioView(DestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

<<<<<<< HEAD
class ComentariosNoticiasViewSet(viewsets.ModelViewSet):
    queryset = ComentariosNoticias.objects.all()
    serializer_class = ComentariosNoticiasSerializer
    permission_classes = [IsAuthenticated]
=======
class UsuarioDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
>>>>>>> d9dd4453354d36f6b527b13a4e073e2c3340d902

class EditarCursoView(APIView):
    def patch(self, request, id_curso=None):
        try:
            # Traemos el curso por su id
            curso = Curso.objects.get(id=id_curso)

            # Actualizamos solo los campos que nos envíen
            nombre_curso = request.data.get("nombre_curso")
            descripcion_curso = request.data.get("descripcion")
            instructor = request.data.get("instructor")
            cupos = request.data.get("cupos")
            modalidad = request.data.get("modalidad")

<<<<<<< HEAD
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
=======
            if nombre_curso:
                curso.nombre_curso = nombre_curso
            if descripcion_curso:
                curso.descripcion = descripcion_curso
            if instructor:
                curso.instructor = instructor
            if cupos is not None:
                curso.cupos = cupos
            if modalidad:
                curso.modalidad = modalidad

            curso.save()

            # Devolvemos el curso actualizado como JSON
            serializer = CursoSerializer(curso)
            return Response(
                {"mensaje": "Curso actualizado correctamente.", "curso": serializer.data},
                status=status.HTTP_200_OK
            )

        except Curso.DoesNotExist:
            return Response({"error": "Curso no encontrado."}, status=status.HTTP_404_NOT_FOUND)
        
class EliminarCursoView(DestroyAPIView):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer
    lookup_field = "id"   # campo en el modelo

    def delete(self, request, *args, **kwargs):
        try:
            curso = self.get_object()
            curso.delete()
            return Response({"mensaje": "Curso eliminado correctamente."}, status=status.HTTP_204_NO_CONTENT)
        except Curso.DoesNotExist:
            return Response({"error": "Curso no encontrado."}, status=status.HTTP_404_NOT_FOUND)
        
class CursoDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Curso.objects.all()
    serializer_class = UsuarioSerializer
>>>>>>> d9dd4453354d36f6b527b13a4e073e2c3340d902
