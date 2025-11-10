from rest_framework.serializers import ModelSerializer
from .models import Usuario
from .models import Curso
from .models import Inscripcion
from .models import CategoriaEvento
from .models import Evento
from .models import AsistenteEvento


class UsuarioSerializer(ModelSerializer):
    class Meta:
        model = Usuario
        exclude = [
            "is_superuser",
            "last_login",
            "is_staff",
            "is_active",
            "groups",
            "user_permissions"
        ]

class CursoSerializer(ModelSerializer):
    class Meta:
        model = Curso
        fields = "__all__"

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
