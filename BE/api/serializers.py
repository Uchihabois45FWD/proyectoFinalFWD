from rest_framework.serializers import ModelSerializer
from .models import Usuario
from .models import Curso
from .models import Inscripcion
from .models import CategoriaEvento
from .models import Evento
from .models import AsistenteEvento
from .models import Organizador

class UsuarioSerializer(ModelSerializer):
    class Meta:
        model = Usuario
        fields = ["id","username","email","first_name","last_name","password","fecha_nacimiento","direccion","rol","num_telefono"]
        
    def create(self,validated_data):
        clave = validated_data.pop("password")
        usuario = Usuario(**validated_data)
        usuario.set_password(clave)
        usuario.save()
        return usuario

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

class OrganizadorSerializer(ModelSerializer):
    class Meta:
        model = Organizador
        fields = "__all__"
