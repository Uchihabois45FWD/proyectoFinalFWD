from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, DestroyAPIView, RetrieveUpdateDestroyAPIView
from .models import Usuario, Curso, Inscripcion, CategoriaEvento, Evento, AsistenteEvento,Organizador,Noticias, ComentariosCursos, InscripcionCurso
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
        serializer = LoginSerializer(data=request.data) # el traductorsh
        if serializer.is_valid(): # si existe el usuario
            user = serializer.validated_data["user"]
            token = str(RefreshToken.for_user(user))
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
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UsuarioPorIdView(ListCreateAPIView):
    serializer_class = UsuarioSerializer
    
    def get_queryset(self):
        id_usuario = self.kwargs["id_usuario"] # llega por la url
        return Usuario.objects.filter(id=id_usuario)

class EditarUsuarioView(APIView):
    def patch(self,request):
        id_usuario = request.data.get("id_usuario")  # lo que va a identificar al usuario
        nombre_usuario = request.data.get("username")
        correo_usuario = request.data.get("email")
        telefono_usuario = request.data.get("num_telefono")
        direccion_usuario = request.data.get("direccion")
        imagen_perfil = request.FILES.get("imagen_perfil")

        try:
            usuario = Usuario.objects.get(id=id_usuario)  # traemos al usuario por el id

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
            if imagen_perfil:
                usuario.imagen_perfil = imagen_perfil

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
            descripcion_curso = request.data.get("descripcion")
            instructor = request.data.get("instructor")
            cupos = request.data.get("cupos")
            modalidad = request.data.get("modalidad")

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