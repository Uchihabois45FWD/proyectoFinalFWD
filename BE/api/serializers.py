from rest_framework import serializers
from django.contrib.auth import authenticate
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

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = [
            "id", "username", "email", "first_name", "last_name", "password",
            "fecha_nacimiento", "direccion", "rol", "num_telefono"
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

class CursoSerializer(serializers.ModelSerializer):
    nombre_instructor = serializers.CharField(source="instructor.first_name", read_only=True)
    apellido_instructor = serializers.CharField(source="instructor.last_name", read_only=True)

    class Meta:
        model = Curso
        fields = "__all__"


# ------------------- Inscripciones -------------------

class InscripcionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inscripcion
        fields = "__all__"


class InscripcionCursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = InscripcionCurso
        fields = "__all__"


# ------------------- Eventos -------------------

class CategoriaEventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaEvento
        fields = "__all__"


class EventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = "__all__"


class AsistenteEventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AsistenteEvento
        fields = "__all__"


class OrganizadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organizador
        fields = "__all__"
 

# ------------------- Noticias -------------------

class NoticiasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Noticias
        fields = "__all__"


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

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            raise serializers.ValidationError("Debes ingresar usuario y contraseña.")

        if len(password) < 6:
            raise serializers.ValidationError({"password": "La contraseña debe tener al menos 6 caracteres."})

        user = authenticate(username=username, password=password)
        if not user:
            raise serializers.ValidationError("Credenciales inválidas.")

        data["user"] = user
        return data