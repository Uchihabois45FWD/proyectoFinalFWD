from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from django.contrib.auth import authenticate
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


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = [
            "id", "username", "email", "first_name", "last_name", "password",
            "fecha_nacimiento", "direccion", "rol", "num_telefono", "imagen_perfil"
        ]

    def create(self, validated_data):
        clave = validated_data.pop("password")
        usuario = Usuario(**validated_data)
        usuario.set_password(clave)
        usuario.save()
        return usuario

    def validate(self, data):
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


class CursoSerializer(serializers.ModelSerializer):
    nombre_instructor = serializers.SerializerMethodField()
    apellido_instructor = serializers.SerializerMethodField()

    class Meta:
        model = Curso
        fields = "__all__"

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
    class Meta:
        model = Inscripcion
        fields = "__all__"


class CategoriaEventoSerializer(ModelSerializer):
    class Meta:
        model = CategoriaEvento
        fields = "__all__"


class EventoSerializer(ModelSerializer):
    class Meta:
        model = Evento
        fields = "__all__"


class AsistenteEventoSerializer(ModelSerializer):
    class Meta:
        model = AsistenteEvento
        fields = "__all__"


class OrganizadorSerializer(ModelSerializer):
    class Meta:
        model = Organizador
        fields = "__all__"


class NoticiasSerializer(ModelSerializer):
    class Meta:
        model = Noticias
        fields = "__all__"


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
        return data


class ComentariosCursosSerializer(ModelSerializer):
    class Meta:
        model = ComentariosCursos
        fields = "__all__"


class InscripcionCursoSerializer(ModelSerializer):
    class Meta:
        model = InscripcionCurso
        fields = "__all__"
