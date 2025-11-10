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
        fields = "__all__"
