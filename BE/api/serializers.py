from rest_framework import serializers
from django.contrib.auth import authenticate
<<<<<<< HEAD
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


# ------------------- Usuario -------------------
=======
from .models import Usuario
from .models import Curso
from .models import Inscripcion
from .models import CategoriaEvento
from .models import Evento
from .models import AsistenteEvento
from .models import Organizador
from .models import Noticias
from .models import ComentariosCursos
from .models import InscripcionCurso

>>>>>>> d9dd4453354d36f6b527b13a4e073e2c3340d902

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = [
            "id", "username", "email", "first_name", "last_name", "password",
            "fecha_nacimiento", "direccion", "rol", "num_telefono", "imagen_perfil"
        ]
        extra_kwargs = {
            'password': {'required': False, 'allow_blank': True}
        }

    def create(self, validated_data):
        clave = validated_data.pop("password")
        usuario = Usuario(**validated_data)
        usuario.set_password(clave)
        usuario.save()
        return usuario

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance

    def validate(self, data):
<<<<<<< HEAD
        # Password solo se valida si está presente y es requerido (create)
        if "password" in data and data["password"]:
            if len(data["password"]) < 6:
                raise serializers.ValidationError({"password": "La contraseña debe tener al menos 6 caracteres."})

        # Validación de teléfono (solo si está presente)
        if "num_telefono" in data and data["num_telefono"]:
            if not data["num_telefono"].isdigit():
                raise serializers.ValidationError({"num_telefono": "El número de teléfono debe contener solo dígitos."})
            if len(data["num_telefono"]) != 8:
                raise serializers.ValidationError({"num_telefono": "El número de teléfono debe tener exactamente 8 dígitos."})

        # Validación de dirección
        if "direccion" in data and data["direccion"] and len(data["direccion"]) < 5:
            raise serializers.ValidationError({"direccion": "La dirección debe tener al menos 5 caracteres."})

        # Validación de nombre
        if "first_name" in data and data["first_name"] and not data["first_name"].isalpha():
            raise serializers.ValidationError({"first_name": "El nombre debe contener solo letras."})
        
        # Validación de apellido
        if "last_name" in data and data["last_name"] and not data["last_name"].isalpha():
            raise serializers.ValidationError({"last_name": "El apellido debe contener solo letras."})

        # Validación de email
        if "email" in data and data["email"]:
            if "@" not in data["email"] or "." not in data["email"]:
                raise serializers.ValidationError({"email": "El correo electrónico no es válido."})

        return data


# ------------------- Curso -------------------
=======
        if len(data["password"]) < 6:
            raise serializers.ValidationError(
                {"password": "La contraseña debe tener al menos 6 caracteres."})

        if not data["num_telefono"].isdigit():
            raise serializers.ValidationError(
                {"num_telefono": "El número de teléfono debe contener solo dígitos."})
        if len(data["num_telefono"]) != 8:
            raise serializers.ValidationError(
                {"num_telefono": "El número de teléfono debe tener exactamente 8 dígitos."})

        if len(data["direccion"]) < 5:
            raise serializers.ValidationError(
                {"direccion": "La dirección debe tener al menos 5 caracteres."})

        if not data["first_name"].isalpha():
            raise serializers.ValidationError(
                {"first_name": "El nombre debe contener solo letras."})
        if not data["last_name"].isalpha():
            raise serializers.ValidationError(
                {"last_name": "El apellido debe contener solo letras."})

        if "@" not in data["email"] or "." not in data["email"]:
            raise serializers.ValidationError(
                {"email": "El correo electrónico no es válido."})

        return data

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        if instance.imagen_perfil:
            rep["imagen_perfil"] = instance.imagen_perfil.url
        else:
            rep["imagen_perfil"] = None
        return rep

>>>>>>> d9dd4453354d36f6b527b13a4e073e2c3340d902

class CursoSerializer(serializers.ModelSerializer):
    nombre_instructor = serializers.SerializerMethodField()
    apellido_instructor = serializers.SerializerMethodField()

    class Meta:
        model = Curso
        fields = "__all__"

<<<<<<< HEAD

# ------------------- Inscripciones -------------------

class InscripcionSerializer(serializers.ModelSerializer):
=======
    def get_nombre_instructor(self, obj):
        try:
            return obj.instructor.first_name if obj.instructor else "Sin instructor"
        except:
            return "Sin instructor"

    def get_apellido_instructor(self, obj):
        try:
            return obj.instructor.last_name if obj.instructor else "Sin instructor"
        except:
            return "Sin instructor"


class InscripcionSerializer(ModelSerializer):
>>>>>>> d9dd4453354d36f6b527b13a4e073e2c3340d902
    class Meta:
        model = Inscripcion
        fields = "__all__"


<<<<<<< HEAD
class InscripcionCursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = InscripcionCurso
        fields = "__all__"


# ------------------- Eventos -------------------

class CategoriaEventoSerializer(serializers.ModelSerializer):
=======
class CategoriaEventoSerializer(ModelSerializer):
>>>>>>> d9dd4453354d36f6b527b13a4e073e2c3340d902
    class Meta:
        model = CategoriaEvento
        fields = "__all__"


<<<<<<< HEAD
class EventoSerializer(serializers.ModelSerializer):
=======
class EventoSerializer(ModelSerializer):
>>>>>>> d9dd4453354d36f6b527b13a4e073e2c3340d902
    class Meta:
        model = Evento
        fields = "__all__"


<<<<<<< HEAD
class AsistenteEventoSerializer(serializers.ModelSerializer):
=======
class AsistenteEventoSerializer(ModelSerializer):
>>>>>>> d9dd4453354d36f6b527b13a4e073e2c3340d902
    class Meta:
        model = AsistenteEvento
        fields = "__all__"


<<<<<<< HEAD
class OrganizadorSerializer(serializers.ModelSerializer):
=======
class OrganizadorSerializer(ModelSerializer):
>>>>>>> d9dd4453354d36f6b527b13a4e073e2c3340d902
    class Meta:
        model = Organizador
        fields = "__all__"
 

<<<<<<< HEAD
# ------------------- Noticias -------------------

class NoticiasSerializer(serializers.ModelSerializer):
=======

class NoticiasSerializer(ModelSerializer):
>>>>>>> d9dd4453354d36f6b527b13a4e073e2c3340d902
    class Meta:
        model = Noticias
        fields = "__all__"


<<<<<<< HEAD
class ComentariosNoticiasSerializer(serializers.ModelSerializer):
    usuario_nombre = serializers.CharField(source='usuario.username', read_only=True)

    class Meta:
        model = ComentariosNoticias
        fields = ['id', 'noticia', 'usuario', 'usuario_nombre', 'contenido_comentario', 'fecha_comentario']
        read_only_fields = ['id', 'fecha_comentario', 'usuario_nombre', 'usuario']


# ------------------- Comentarios Cursos -------------------

class ComentariosCursosSerializer(serializers.ModelSerializer):
    usuario_nombre = serializers.CharField(source="usuario.username", read_only=True)

    class Meta:
        model = ComentariosCursos
        fields = ["id", "usuario", "usuario_nombre", "curso", "contenido_comentario", "fecha_comentario", "calificacion"]


# ------------------- Login -------------------

=======
>>>>>>> d9dd4453354d36f6b527b13a4e073e2c3340d902
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            raise serializers.ValidationError(
                "Debes ingresar usuario y contraseña.")

        if len(password) < 6:
            raise serializers.ValidationError(
                {"password": "La contraseña debe tener al menos 6 caracteres."})

        user = authenticate(username=username, password=password)
        if not user:
            raise serializers.ValidationError("Credenciales inválidas.")

        data["user"] = user
<<<<<<< HEAD
        return data
=======
        return data


class ComentariosCursosSerializer(ModelSerializer):
    class Meta:
        model = ComentariosCursos
        fields = "__all__"


class InscripcionCursoSerializer(ModelSerializer):
    class Meta:
        model = InscripcionCurso
        fields = "__all__"
>>>>>>> d9dd4453354d36f6b527b13a4e073e2c3340d902
