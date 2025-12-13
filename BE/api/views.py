from rest_framework.permissions import AllowAny
from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, DestroyAPIView, RetrieveUpdateDestroyAPIView
from .models import Usuario, Curso, Inscripcion, Categoria, Evento, Organizacion, Noticias, ComentariosCursos, InscripcionCurso, CategoriaOpciones, ComentariosNoticias
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .serializers import (
    UsuarioSerializer,
    CursoSerializer,
    InscripcionSerializer,
    CategoriaSerializer,
    EventoSerializer,
    OrganizacionSerializer,
    NoticiasSerializer,
    LoginSerializer,
    ComentariosCursosSerializer,
    ComentariosNoticiasSerializer,
    InscripcionCursoSerializer,
    CategoriaOpcionesSerializer
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


class CategoriaCreateView(ListCreateAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer


class EventoCreateView(ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = Evento.objects.all()
    serializer_class = EventoSerializer


class OrganizacionCreateView(ListCreateAPIView):
    queryset = Organizacion.objects.all()
    serializer_class = OrganizacionSerializer


class NoticiasCreateView(ListCreateAPIView):
    queryset = Noticias.objects.all()
    serializer_class = NoticiasSerializer


class UsuarioLoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data["user"]

            refresh = RefreshToken.for_user(user)
            token = str(refresh.access_token)

            return Response({
                "mensaje": "Inicio de sesión exitoso",
                "imagen_perfil": user.imagen_perfil.url if user.imagen_perfil else None,
                "usuario": user.username,
                "nombre": user.first_name,
                "apellido": user.last_name,
                "email": user.email,
                "token": token,
                "id_usuario": user.id,
                "rol": user.rol
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UsuarioPorIdView(ListCreateAPIView):
    serializer_class = UsuarioSerializer

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
        rol_usuario = request.data.get("rol")
        imagen_perfil = request.FILES.get("imagen_perfil")
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
            if rol_usuario:
                usuario.rol = rol_usuario
            if imagen_perfil:
                usuario.imagen_perfil = imagen_perfil
            usuario.save()  # confirmamos y guardamos en la base de datos
            # Devolvemos el usuario actualizado
            serializer = UsuarioSerializer(usuario)
            return Response({
                "mensaje": "Usuario actualizado correctamente.",
                "usuario": serializer.data
            }, status=status.HTTP_200_OK)
        except Usuario.DoesNotExist:
            return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)


# esto
class ComentariosCursosCreateView(ListCreateAPIView):
    queryset = ComentariosCursos.objects.all()
    serializer_class = ComentariosCursosSerializer


class ComentariosNoticiasCreateView(ListCreateAPIView):
    queryset = ComentariosNoticias.objects.all()
    serializer_class = ComentariosNoticiasSerializer


class InscripcionCursoCreateView(ListCreateAPIView):
    queryset = InscripcionCurso.objects.all()
    serializer_class = InscripcionCursoSerializer


class EliminarUsuarioView(DestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class UsuarioDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class EditarCursoView(APIView):
    def patch(self, request, id_curso=None):
        try:
            # Traemos el curso por su id
            curso = Curso.objects.get(id=id_curso)
            # Actualizamos solo los campos que nos envíen
            nombre_curso = request.data.get("nombre_curso")
            descripcion_curso = request.data.get("descripcion_curso")
            instructor = request.data.get("instructor")
            limite_cupos = request.data.get("limite_cupos")
            modalidad = request.data.get("modalidad")
            fecha_inicio_curso = request.data.get("fecha_inicio_curso")
            fecha_fin_curso = request.data.get("fecha_fin_curso")
            primer_dia = request.data.get("primer_dia")
            ultimo_dia = request.data.get("ultimo_dia")
            certificado = request.data.get("certificado")
            destacado = request.data.get("destacado")

            if nombre_curso is not None:
                curso.nombre_curso = nombre_curso
            if descripcion_curso is not None:
                curso.descripcion = descripcion_curso
            if instructor is not None:
                try:
                    curso.instructor = Usuario.objects.get(id=instructor)
                except Usuario.DoesNotExist:
                    return Response({"error": "Instructor no encontrado."}, status=status.HTTP_400_BAD_REQUEST)
            if limite_cupos is not None:
                curso.limite_cupos = limite_cupos
            if modalidad is not None:
                curso.modalidad = modalidad
            if fecha_inicio_curso is not None:
                curso.fecha_inicio_curso = fecha_inicio_curso
            if fecha_fin_curso is not None:
                curso.fecha_fin_curso = fecha_fin_curso
            if primer_dia is not None:
                curso.primer_dia = primer_dia
            if ultimo_dia is not None:
                curso.ultimo_dia = ultimo_dia
            if certificado is not None:
                curso.certificado = certificado
            if destacado is not None:
                curso.destacado = destacado

            curso.save()
            # Devolvemos el curso actualizado como JSON
            serializer = CursoSerializer(curso)
            return Response(
                {"mensaje": "Curso actualizado correctamente.",
                    "curso": serializer.data},
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


class CategoriaOpcionesCreateView(ListCreateAPIView):
    queryset = CategoriaOpciones.objects.all()
    serializer_class = CategoriaOpcionesSerializer
