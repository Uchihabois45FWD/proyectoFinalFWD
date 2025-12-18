from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, ValidationError
from django.contrib.auth import authenticate

from .models import (
    Usuario, Curso, Inscripcion, Categoria, Evento,
    Organizacion, Noticias, ComentariosCursos,
    InscripcionCurso, ComentariosNoticias, CategoriaOpciones
)


class UsuarioSerializer(ModelSerializer):
    class Meta:
        model = Usuario
        fields = [
            "id", "username", "email", "first_name", "last_name", "password",
            "fecha_nacimiento", "direccion", "rol", "num_telefono", "imagen_perfil"
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop("password")
        usuario = Usuario(**validated_data)
        usuario.set_password(password)
        usuario.save()
        return usuario

    def validate(self, data):
        if len(data["password"]) < 6:
            raise serializers.ValidationError({"password": "Mínimo 6 caracteres."})
        if not data["num_telefono"].isdigit() or len(data["num_telefono"]) != 8:
            raise serializers.ValidationError({"num_telefono": "Debe tener 8 dígitos."})
        if len(data["direccion"]) < 5:
            raise serializers.ValidationError({"direccion": "Dirección muy corta."})
        import re
        if not re.match(r'^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$', data["first_name"]):
            raise serializers.ValidationError({"first_name": "Solo letras."})
        if not re.match(r'^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$', data["last_name"]):
            raise serializers.ValidationError({"last_name": "Solo letras."})
        if "@" not in data["email"]:
            raise serializers.ValidationError({"email": "Correo inválido."})
        return data


class CursoSerializer(ModelSerializer):
    nombre_instructor = serializers.CharField(source="instructor.first_name", read_only=True)
    apellido_instructor = serializers.CharField(source="instructor.last_name", read_only=True)

    instructor = serializers.PrimaryKeyRelatedField(
        queryset=Usuario.objects.filter(rol="instructor")
    )

    class Meta:
        model = Curso
        fields = "__all__"

    def validate_limite_cupos(self, value):
        if value <= 0:
            raise ValidationError("El límite de cupos debe ser mayor a 0.")
        return value

    def validate_fecha_inicio_curso(self, value):
        from datetime import date
        if value < date.today():
            raise ValidationError("La fecha de inicio no puede ser anterior a hoy.")
        return value

    def validate_fecha_fin_curso(self, value):
        from datetime import date
        fecha_inicio_str = self.initial_data.get('fecha_inicio_curso')
        if fecha_inicio_str:
            try:
                fecha_inicio = date.fromisoformat(fecha_inicio_str)
                if value <= fecha_inicio:
                    raise ValidationError("La fecha de fin debe ser posterior a la fecha de inicio.")
            except ValueError:
                raise ValidationError("Formato de fecha de inicio inválido.")
        return value

    def create(self, validated_data):
        # Ensure imagen_curso has a default value if not provided
        if 'imagen_curso' not in validated_data or validated_data['imagen_curso'] is None:
            validated_data['imagen_curso'] = ""
        return super().create(validated_data)


class InscripcionSerializer(ModelSerializer):
    nombre_curso = serializers.CharField(source="curso.nombre_curso", read_only=True)

    class Meta:
        model = Inscripcion
        fields = "__all__"


class CategoriaSerializer(ModelSerializer):
    class Meta:
        model = Categoria
        fields = "__all__"


class EventoSerializer(ModelSerializer):
    usuario_nombre = serializers.CharField(source="organizador.username", read_only=True)
    organizador_nombre = serializers.SerializerMethodField()
    id_evento = serializers.IntegerField(source='id', read_only=True)

    categoria = serializers.PrimaryKeyRelatedField(
        queryset=Categoria.objects.all()
    )

    organizador = serializers.PrimaryKeyRelatedField(
        queryset=Usuario.objects.filter(rol="organizador"),
        allow_null=True
    )

    class Meta:
        model = Evento
        fields = "__all__"

    def get_organizador_nombre(self, obj):
        if obj.organizador:
            return f"{obj.organizador.first_name} {obj.organizador.last_name}".strip()
        return "Sin organizador"


class OrganizacionSerializer(ModelSerializer):
    class Meta:
        model = Organizacion
        fields = "__all__"


class NoticiasSerializer(ModelSerializer):
    class Meta:
        model = Noticias
        fields = "__all__"


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(
            username=data.get("username"),
            password=data.get("password")
        )
        if not user:
            raise serializers.ValidationError("Credenciales inválidas.")
        data["user"] = user
        return data


class ComentariosCursosSerializer(ModelSerializer):
    class Meta:
        model = ComentariosCursos
        fields = "__all__"


class InscripcionCursoSerializer(ModelSerializer):
    nombre_curso = serializers.CharField(source="curso.nombre_curso", read_only=True)

    class Meta:
        model = InscripcionCurso
        fields = "__all__"


class ComentariosNoticiasSerializer(ModelSerializer):
    usuario_nombre = serializers.CharField(source="usuario.username", read_only=True)

    class Meta:
        model = ComentariosNoticias
        fields = "__all__"


class CategoriaOpcionesSerializer(ModelSerializer):
    class Meta:
        model = CategoriaOpciones
        fields = "__all__"
